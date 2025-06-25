<img src="https://billy-mcp.vercel.app/assets/orangePeek.png" alt="Billy MCP" width="400"/>

# 🏛️ Billy MCP Client

> **Congressional Intelligence API for Claude Desktop & Cursor**

Connect your AI assistant to live congressional data with Billy MCP - the most comprehensive congressional intelligence API available.

![Billy MCP](https://img.shields.io/badge/Billy-MCP-orange?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkZBNTAwIi8+Cjwvc3ZnPgo=)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green?style=for-the-badge&logo=node.js)

## ✨ Features

- 🏛️ **40+ Congressional Tools** - Comprehensive access to bills, amendments, votes, members, and more
- 🔄 **Real-time Data** - Live congressional information updated continuously
- 🔒 **Your API Keys** - Use your own Congress.gov API key (free, 5,000 requests/hour)
- 🚀 **Zero Configuration** - Download, configure, and start using immediately
- 🤖 **AI Enhanced** - Built for Claude Desktop and Cursor integration
- 📊 **Rich Analysis** - Get insights on political trends, voting patterns, and legislative momentum

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **Claude Desktop** or **Cursor** - [Get Claude Desktop](https://claude.ai/desktop)
- **Congress.gov API Key** (free) - [Sign up here](https://api.congress.gov/sign-up)

### 1. Download Billy MCP Client

**Option A: Download ZIP (Recommended)**

1. Click the green "Code" button above
2. Select "Download ZIP"
3. Extract to your preferred location

**Option B: Clone Repository**

```bash
git clone https://github.com/yourusername/billy-mcp-client.git
cd billy-mcp-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Get Your Congress.gov API Key

1. Visit [api.congress.gov/sign-up](https://api.congress.gov/sign-up)
2. Fill out the simple form (name, email, intended use)
3. Check your email for the API key (arrives instantly)
4. Save your key - you'll need it in the next step

### 4. Configure Claude Desktop

Find your Claude Desktop config file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

Add this configuration (replace the paths and API key):

```json
{
  "mcpServers": {
    "billy": {
      "command": "node",
      "args": ["/full/path/to/billy-mcp-client/mcp-client.js"],
      "env": {
        "MCP_SERVER_URL": "https://billy-mcp.vercel.app",
        "CONGRESS_API_KEY": "your_congress_api_key_here"
      }
    }
  }
}
```

**Important Notes:**

- Replace `/full/path/to/billy-mcp-client/mcp-client.js` with the actual absolute path to your downloaded file
- Replace `your_congress_api_key_here` with your actual Congress.gov API key
- The `MCP_SERVER_URL` should point to the Billy MCP server (update if different)

### 5. Restart Claude Desktop

Close and reopen Claude Desktop to load the new configuration.

### 6. Test Your Setup

Try asking Claude:

- _"What bills were introduced this week?"_
- _"Search for amendments about climate change"_
- _"Who are the senators from California?"_
- _"Show me recent House votes on energy policy"_

## 🛠️ Configuration Options

### Environment Variables

| Variable           | Required    | Description                           |
| ------------------ | ----------- | ------------------------------------- |
| `MCP_SERVER_URL`   | ✅ Yes      | https://billy-mcp.vercel.app          |
| `CONGRESS_API_KEY` | ✅ Yes      | Your Congress.gov API key             |
| `DEFAULT_CONGRESS` | ❌ Optional | Default congress number (e.g., "119") |

### Advanced Configuration

For power users who want to customize behavior:

```json
{
  "mcpServers": {
    "billy": {
      "command": "node",
      "args": ["/path/to/mcp-client.js"],
      "env": {
        "MCP_SERVER_URL": "https://billy-mcp.vercel.app",
        "CONGRESS_API_KEY": "your_api_key",
        "DEFAULT_CONGRESS": "118"
      }
    }
  }
}
```

## 🔧 Troubleshooting

### Common Issues

**"Cannot find module" error**

```bash
# Make sure you're in the right directory and run:
npm install
```

**"MCP_SERVER_URL is required" error**

- Check your Claude Desktop config file syntax
- Ensure the server URL is correct
- Verify environment variables are properly set

**"CONGRESS_API_KEY is required" error**

- Verify your API key at [api.congress.gov](https://api.congress.gov)
- Check for typos in the config file
- Ensure the key is inside quotes

**"Failed to connect to Billy MCP Server" error**

- Check your internet connection
- Verify the server URL is accessible in your browser
- Try restarting Claude Desktop

### Getting Help

1. **Check the server status**: Visit the server URL in your browser
2. **Verify your API key**: Test it at the Congress.gov API documentation
3. **Check Claude Desktop logs**: Look for detailed error messages
4. **Update Node.js**: Ensure you're running version 18 or higher

## 📊 What You Can Ask

### Bills & Legislation

- "What bills were introduced this week?"
- "Search for climate change legislation"
- "Show me the text of HR 1234"
- "What's the status of the infrastructure bill?"

### Members of Congress

- "Who represents California in the Senate?"
- "Show me Nancy Pelosi's recent sponsored bills"
- "What committees is AOC on?"

### Voting Records

- "How did senators vote on the latest budget bill?"
- "Show me recent House votes on healthcare"
- "What was the vote breakdown on HR 5678?"

### Amendments

- "Search for amendments about immigration"
- "Show me recent amendments by Ted Cruz"
- "What amendments were added to the defense bill?"

### And Much More!

- Congressional schedules
- Committee hearings
- CRS reports
- Treaties
- Nominations

## 🎯 API Limits

- **Congress.gov API**: 5,000 requests per hour (free tier)
- **Billy MCP Server**: No limits (uses your Congress.gov quota)
- **Rate limiting**: Automatically handled by the client

## 🏗️ Development

### Project Structure

```
billy-mcp-client/
├── mcp-client.js      # Main client file
├── package.json       # Dependencies and scripts
├── README.md          # This file
└── .gitignore         # Git ignore patterns
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Congress.gov API** - For providing free access to congressional data
- **Model Context Protocol** - For the standardized AI integration framework
- **Anthropic** - For Claude Desktop and the MCP ecosystem

---

**Ready to explore Congress?** Download Billy MCP Client and start asking questions! 🚀

For more information, visit the [Billy MCP Server](https://billy-mcp.vercel.app)
