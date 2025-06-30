#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  InitializeRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Billy MCP Server - Pure Stdio Implementation with Full Tool Set
 * Loads all tools from tool-definitions.json and proxies to HTTP server
 */
class BillyMCPStdioServer {
  constructor() {
    this.server = new Server(
      {
        name: "billy-congress",
        version: "2.0.0",
        description: "🏛️ Billy Congressional Intelligence - Full API Access",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.mcpServerUrl = process.env.MCP_SERVER_URL || "https://mcp.billy.wiki";
    this.congressApiKey = process.env.CONGRESS_API_KEY;
    this.defaultCongress = process.env.DEFAULT_CONGRESS || "119";

    // Load tools from JSON file
    this.loadToolDefinitions();

    console.error("🏛️ Billy MCP Stdio Server initialized");
    console.error(`🌐 Server URL: ${this.mcpServerUrl}`);
    console.error(
      `🔑 Congress API: ${
        this.congressApiKey ? "✅ Provided" : "❌ Not provided"
      }`
    );
    console.error(`🛠️  Tools loaded: ${this.tools.length}`);

    this.setupRequestHandlers();
  }

  loadToolDefinitions() {
    try {
      const toolsPath = join(
        __dirname,
        "billy-mcp-client",
        "tool-definitions.json"
      );
      const toolsData = readFileSync(toolsPath, "utf8");
      this.tools = JSON.parse(toolsData);
      console.error(`✅ Loaded ${this.tools.length} tool definitions`);
    } catch (error) {
      console.error(`❌ Failed to load tool definitions: ${error.message}`);
      this.tools = [
        {
          name: "search_bills",
          description: "🏛️ Search for congressional bills (fallback mode)",
          inputSchema: {
            type: "object",
            properties: {
              query: { type: "string", description: "Search query" },
            },
            required: ["query"],
          },
        },
      ];
    }
  }

  async makeHttpRequest(toolName, args) {
    const url = `${this.mcpServerUrl}/api/tools/call`;

    const requestBody = {
      tool: toolName,
      arguments: {
        ...args,
        CONGRESS_API_KEY: this.congressApiKey,
        DEFAULT_CONGRESS: this.defaultCongress,
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Billy-MCP-Stdio/2.0.0",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();

      // Convert HTTP response to MCP format
      if (result.success) {
        return result.result;
      } else {
        throw new Error(result.error || "Unknown error from server");
      }
    } catch (error) {
      console.error(`❌ HTTP request failed for ${toolName}:`, error.message);
      throw new McpError(
        ErrorCode.InternalError,
        `Tool execution failed: ${error.message}`
      );
    }
  }

  setupRequestHandlers() {
    // Handle initialize request
    this.server.setRequestHandler(InitializeRequestSchema, async (request) => {
      return {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: "billy-congress",
          version: "2.0.0",
        },
      };
    });

    // List tools - return all loaded tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.tools,
      };
    });

    // Handle tool calls - universal proxy to HTTP server
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      // Check if tool exists in our definitions
      const toolDef = this.tools.find((tool) => tool.name === name);
      if (!toolDef) {
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }

      try {
        console.error(`🔧 Executing tool: ${name}`);
        return await this.makeHttpRequest(name, args);
      } catch (error) {
        console.error(`❌ Error in tool ${name}:`, error.message);
        throw error; // Re-throw MCP errors as-is
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("🏛️ Billy MCP Stdio Server connected and ready");
  }
}

// Run the server
const server = new BillyMCPStdioServer();
server.run().catch((error) => {
  console.error("❌ Failed to start Billy MCP Stdio Server:", error);
  process.exit(1);
});
