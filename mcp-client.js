#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

/**
 * Billy MCP Client - Congressional Intelligence API
 * Connects Claude Desktop/Cursor to the hosted Billy MCP Server
 *
 * Server URL: https://billy-mcp.vercel.app
 */
class BillyMCPClient {
  constructor() {
    this.server = new Server(
      {
        name: "billy-mcp-client",
        version: "1.0.0",
        description:
          "🏛️ Billy MCP Client - Congressional Intelligence API for Claude Desktop",
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    // Get configuration from environment
    this.serverUrl = process.env.MCP_SERVER_URL;
    this.congressApiKey = process.env.CONGRESS_API_KEY;
    this.defaultCongress = process.env.DEFAULT_CONGRESS;

    if (!this.serverUrl) {
      console.error(
        "❌ MCP_SERVER_URL is required in your Claude Desktop config"
      );
      console.error("   Example: https://billy-mcp.vercel.app");
      process.exit(1);
    }

    if (!this.congressApiKey && !this.defaultCongress) {
      console.error(
        "❌ Either CONGRESS_API_KEY or DEFAULT_CONGRESS is required"
      );
      console.error(
        "   Get your free API key at: https://api.congress.gov/sign-up"
      );
      process.exit(1);
    }

    console.error("🏛️ Billy MCP Client initialized");
    console.error(`🌐 Server: ${this.serverUrl}`);
    console.error(
      `🔑 Congress API: ${
        this.congressApiKey ? "✅ Provided" : "❌ Not provided"
      }`
    );
    console.error(
      `📋 Default Congress: ${
        this.defaultCongress ? "✅ Provided" : "❌ Not provided"
      }`
    );

    this.setupRequestHandlers();
  }

  async makeHttpRequest(endpoint, data = null) {
    const url = `${this.serverUrl}${endpoint}`;

    try {
      const options = {
        method: data ? "POST" : "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`❌ HTTP request failed to ${url}:`, error.message);
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to connect to Billy MCP Server: ${error.message}`
      );
    }
  }

  setupRequestHandlers() {
    // List resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: "billy://server-info",
            name: "🏛️ Billy MCP Server Information",
            description: "Information about the connected Billy MCP Server",
            mimeType: "application/json",
          },
        ],
      };
    });

    // Read resources
    this.server.setRequestHandler(
      ReadResourceRequestSchema,
      async (request) => {
        const { uri } = request.params;

        if (uri === "billy://server-info") {
          const serverInfo = await this.makeHttpRequest("/info");
          return {
            contents: [
              {
                uri,
                mimeType: "application/json",
                text: JSON.stringify(serverInfo, null, 2),
              },
            ],
          };
        }

        throw new McpError(
          ErrorCode.InvalidRequest,
          `Unknown resource: ${uri}`
        );
      }
    );

    // List tools - get from server
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      try {
        const serverInfo = await this.makeHttpRequest("/info");

        const tools =
          serverInfo.available_tools?.map((tool) => ({
            name: tool.name,
            description: tool.description,
            inputSchema: {
              type: "object",
              properties: {},
            },
          })) || [];

        console.error(
          `✅ Loaded ${tools.length} congressional tools from server`
        );
        return { tools };
      } catch (error) {
        console.error("❌ Failed to get tools from server:", error);
        return { tools: [] };
      }
    });

    // Handle tool calls - proxy to server
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        const enrichedArgs = {
          ...args,
          CONGRESS_API_KEY: this.congressApiKey,
          DEFAULT_CONGRESS: this.defaultCongress,
        };

        const result = await this.makeHttpRequest("/api/tools/call", {
          tool: name,
          arguments: enrichedArgs,
        });

        if (result.success) {
          return result.result;
        } else {
          throw new McpError(
            ErrorCode.InternalError,
            result.error || "Tool execution failed"
          );
        }
      } catch (error) {
        console.error(`❌ Error in tool ${name}:`, error);
        throw new McpError(
          ErrorCode.InternalError,
          `Tool execution failed: ${error.message}`
        );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("🏛️ Billy MCP Client connected to Claude Desktop");
  }
}

// Run the client
const client = new BillyMCPClient();
client.run().catch((error) => {
  console.error("❌ Failed to start Billy MCP Client:", error);
  process.exit(1);
});
