/**
 * MCP Tool Definitions
 * Contains all tool schemas for the Congress MCP Server
 */

export const TOOL_DEFINITIONS = [
  // ===== AMENDMENT TOOLS =====
  {
    name: "search_amendments",
    description:
      "🔍 Intelligent Amendment Search: Find congressional amendments using natural language queries, political topics, sponsor names, or legislative themes.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Natural language search query (e.g., 'healthcare reform', 'climate change', 'defense spending')",
        },
        congress: {
          type: "string",
          description:
            'Congress session number (e.g., "119" for current, "118" for previous)',
        },
        chamber: {
          type: "string",
          enum: ["house", "senate"],
          description: "Legislative chamber (House or Senate)",
        },
        type: {
          type: "string",
          enum: ["hamdt", "samdt"],
          description:
            "Amendment type (hamdt=House amendments, samdt=Senate amendments)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of results to return (1-250)",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
        sort: {
          type: "string",
          enum: [
            "updateDate+desc",
            "updateDate+asc",
            "latestAction+desc",
            "latestAction+asc",
          ],
          default: "updateDate+desc",
          description: "Sort order (most recent updates first is recommended)",
        },
        fromDateTime: {
          type: "string",
          format: "date",
          description: "Start date filter (YYYY-MM-DD format)",
        },
        toDateTime: {
          type: "string",
          format: "date",
          description: "End date filter (YYYY-MM-DD format)",
        },
      },
    },
  },
  {
    name: "get_amendment_details",
    description:
      "📋 Deep Amendment Analysis: Get comprehensive information about a specific amendment including sponsor details, legislative history, cosponsors, and political context.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: 'Congress number (e.g., "119" for current session)',
        },
        type: {
          type: "string",
          enum: ["hamdt", "samdt"],
          description: "Amendment type (hamdt=House, samdt=Senate)",
        },
        number: {
          type: "string",
          description: "Amendment number",
        },
        includeText: {
          type: "boolean",
          default: false,
          description:
            "Include full amendment text (useful for content analysis)",
        },
        includeActions: {
          type: "boolean",
          default: true,
          description: "Include complete legislative action history",
        },
        includeCosponsors: {
          type: "boolean",
          default: true,
          description: "Include all cosponsors and political affiliations",
        },
      },
      required: ["congress", "type", "number"],
    },
  },
  {
    name: "get_amendment_text",
    description:
      "📄 Amendment Text Retrieval: Get the full legal text of any amendment for detailed content analysis, legal research, or policy comparison.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: "Congress number",
        },
        type: {
          type: "string",
          enum: ["hamdt", "samdt"],
          description: "Amendment type",
        },
        number: {
          type: "string",
          description: "Amendment number",
        },
        format: {
          type: "string",
          enum: ["json", "xml"],
          default: "json",
          description: "Response format (JSON recommended for AI analysis)",
        },
      },
      required: ["congress", "type", "number"],
    },
  },
  {
    name: "get_amendment_actions",
    description:
      "⚖️ Legislative History Tracker: Get complete timeline of actions, votes, and procedural moves for any amendment.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: "Congress number",
        },
        type: {
          type: "string",
          enum: ["hamdt", "samdt"],
          description: "Amendment type",
        },
        number: {
          type: "string",
          description: "Amendment number",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of actions to return",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
      },
      required: ["congress", "type", "number"],
    },
  },

  // ===== BILL TOOLS =====
  {
    name: "search_bills",
    description:
      "🏛️ Natural language bill search with political analysis: Find bills using natural language queries with AI-enhanced political context, bipartisan analysis, and passage probability assessment.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Natural language search query (e.g., 'infrastructure spending', 'healthcare reform')",
        },
        congress: {
          type: "string",
          description: 'Congress number (e.g., "119")',
        },
        chamber: {
          type: "string",
          enum: ["house", "senate"],
          description: "Chamber filter",
        },
        billType: {
          type: "string",
          enum: [
            "hr",
            "hres",
            "hjres",
            "hconres",
            "s",
            "sres",
            "sjres",
            "sconres",
          ],
          description: "Bill type filter",
        },
        fromDateTime: {
          type: "string",
          description: "Start date (YYYY-MM-DD)",
        },
        toDateTime: {
          type: "string",
          description: "End date (YYYY-MM-DD)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of results (1-250)",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Results offset for pagination",
        },
        sort: {
          type: "string",
          enum: [
            "updateDate+desc",
            "updateDate+asc",
            "latestAction+desc",
            "latestAction+asc",
          ],
          default: "updateDate+desc",
          description: "Sort order",
        },
      },
    },
  },
  {
    name: "get_bill_details",
    description:
      "📊 Comprehensive bill analysis with stakeholder mapping: Get detailed bill information including political context, passage probability, sponsor analysis, and AI-powered insights.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: 'Congress number (e.g., "119")',
        },
        billType: {
          type: "string",
          enum: [
            "hr",
            "hres",
            "hjres",
            "hconres",
            "s",
            "sres",
            "sjres",
            "sconres",
          ],
          description: "Bill type",
        },
        billNumber: {
          type: "string",
          description: "Bill number",
        },
      },
      required: ["congress", "billType", "billNumber"],
    },
  },
  {
    name: "get_bill_actions",
    description:
      "⚖️ Legislative timeline with momentum analysis: Track bill progress through the legislative process with AI-powered momentum assessment and bottleneck identification.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: "Congress number",
        },
        billType: {
          type: "string",
          enum: [
            "hr",
            "hres",
            "hjres",
            "hconres",
            "s",
            "sres",
            "sjres",
            "sconres",
          ],
          description: "Bill type",
        },
        billNumber: {
          type: "string",
          description: "Bill number",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of actions to return",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
      },
      required: ["congress", "billType", "billNumber"],
    },
  },
  {
    name: "get_bill_text",
    description:
      "📄 Full bill text with content analysis: Retrieve complete bill text with AI-powered analysis including complexity assessment and key terms extraction.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: "Congress number",
        },
        billType: {
          type: "string",
          enum: [
            "hr",
            "hres",
            "hjres",
            "hconres",
            "s",
            "sres",
            "sjres",
            "sconres",
          ],
          description: "Bill type",
        },
        billNumber: {
          type: "string",
          description: "Bill number",
        },
        format: {
          type: "string",
          enum: ["json", "xml"],
          default: "json",
          description: "Response format",
        },
      },
      required: ["congress", "billType", "billNumber"],
    },
  },
  {
    name: "get_bill_cosponsors",
    description:
      "🤝 Bipartisan coalition analysis: Analyze bill cosponsors with geographic distribution, party dynamics, and bipartisan index calculations.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: "Congress number",
        },
        billType: {
          type: "string",
          enum: [
            "hr",
            "hres",
            "hjres",
            "hconres",
            "s",
            "sres",
            "sjres",
            "sconres",
          ],
          description: "Bill type",
        },
        billNumber: {
          type: "string",
          description: "Bill number",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of cosponsors to return",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
      },
      required: ["congress", "billType", "billNumber"],
    },
  },
  {
    name: "get_bill_committees",
    description:
      "🏛️ Committee jurisdiction and pathway analysis: Identify committees reviewing the bill and analyze the legislative pathway with decision maker identification.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: "Congress number",
        },
        billType: {
          type: "string",
          enum: [
            "hr",
            "hres",
            "hjres",
            "hconres",
            "s",
            "sres",
            "sjres",
            "sconres",
          ],
          description: "Bill type",
        },
        billNumber: {
          type: "string",
          description: "Bill number",
        },
      },
      required: ["congress", "billType", "billNumber"],
    },
  },
  {
    name: "get_bill_subjects",
    description:
      "🏷️ Policy categorization and thematic analysis: Get bill policy subjects with trend analysis and policy area connections.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: "Congress number",
        },
        billType: {
          type: "string",
          enum: [
            "hr",
            "hres",
            "hjres",
            "hconres",
            "s",
            "sres",
            "sjres",
            "sconres",
          ],
          description: "Bill type",
        },
        billNumber: {
          type: "string",
          description: "Bill number",
        },
      },
      required: ["congress", "billType", "billNumber"],
    },
  },
  {
    name: "get_bill_summaries",
    description:
      "📋 Professional summaries with strategic insights: Get official CRS bill summaries with AI-enhanced policy implications and strategic analysis.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: "Congress number",
        },
        billType: {
          type: "string",
          enum: [
            "hr",
            "hres",
            "hjres",
            "hconres",
            "s",
            "sres",
            "sjres",
            "sconres",
          ],
          description: "Bill type",
        },
        billNumber: {
          type: "string",
          description: "Bill number",
        },
      },
      required: ["congress", "billType", "billNumber"],
    },
  },

  // ===== CONGRESSIONAL RECORD TOOLS =====
  {
    name: "search_congressional_record",
    description:
      "📚 Speech and debate search with discourse analysis: Find congressional speeches and floor debates with AI-powered speaker analysis and rhetorical pattern identification.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query for Congressional Record",
        },
        congress: {
          type: "string",
          description: 'Congress number (e.g., "119")',
        },
        chamber: {
          type: "string",
          enum: ["house", "senate"],
          description: "Chamber filter",
        },
        volume: {
          type: "string",
          description: "Volume number",
        },
        section: {
          type: "string",
          enum: ["senate", "house", "extensions-of-remarks", "daily-digest"],
          description: "Section of Congressional Record",
        },
        fromDateTime: {
          type: "string",
          description: "Start date (YYYY-MM-DD)",
        },
        toDateTime: {
          type: "string",
          description: "End date (YYYY-MM-DD)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of results (1-250)",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Results offset for pagination",
        },
        sort: {
          type: "string",
          enum: [
            "updateDate+desc",
            "updateDate+asc",
            "publishDate+desc",
            "publishDate+asc",
          ],
          default: "updateDate+desc",
          description: "Sort order",
        },
      },
    },
  },
  {
    name: "get_congressional_record_details",
    description:
      "📖 Detailed record analysis with historical context: Get comprehensive information about specific Congressional Record entries with parliamentary context and historical significance assessment.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: 'Congress number (e.g., "119")',
        },
        volume: {
          type: "string",
          description: "Volume number",
        },
        pagePrefix: {
          type: "string",
          enum: ["s", "h", "e", "d"],
          description:
            "Page prefix (s=Senate, h=House, e=Extensions, d=Daily Digest)",
        },
        page: {
          type: "string",
          description: "Page number",
        },
      },
      required: ["congress", "volume", "pagePrefix", "page"],
    },
  },
  {
    name: "get_congressional_record_text",
    description:
      "📝 Full text with rhetorical and policy analysis: Retrieve complete Congressional Record text with AI-powered speech pattern analysis and policy position extraction.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: "Congress number",
        },
        volume: {
          type: "string",
          description: "Volume number",
        },
        pagePrefix: {
          type: "string",
          enum: ["s", "h", "e", "d"],
          description: "Page prefix",
        },
        page: {
          type: "string",
          description: "Page number",
        },
        format: {
          type: "string",
          enum: ["json", "xml"],
          default: "json",
          description: "Response format",
        },
      },
      required: ["congress", "volume", "pagePrefix", "page"],
    },
  },

  // ===== CRS REPORTS TOOLS =====
  {
    name: "search_crs_reports",
    description:
      "🔍 Congressional Research Service Report Search: Find CRS reports by topic, date, or policy area. Essential for research on congressional priorities and policy analysis.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Search query for CRS reports (e.g., 'climate change', 'healthcare policy', 'foreign aid')",
        },
        updateDateStart: {
          type: "string",
          format: "date",
          description: "Start date for report updates (YYYY-MM-DD format)",
        },
        updateDateEnd: {
          type: "string",
          format: "date",
          description: "End date for report updates (YYYY-MM-DD format)",
        },
        limit: {
          type: "number",
          description: "Number of results to return (1-250, default: 20)",
          minimum: 1,
          maximum: 250,
          default: 20,
        },
        offset: {
          type: "number",
          description: "Starting offset for pagination (default: 0)",
          minimum: 0,
          default: 0,
        },
        sort: {
          type: "string",
          description: "Sort order",
          enum: [
            "updateDate+desc",
            "updateDate+asc",
            "title+asc",
            "title+desc",
          ],
          default: "updateDate+desc",
        },
      },
    },
  },
  {
    name: "get_crs_report_details",
    description:
      "📋 Detailed CRS Report Analysis: Get comprehensive information about a specific Congressional Research Service report including analysis and policy implications.",
    inputSchema: {
      type: "object",
      properties: {
        crsReportId: {
          type: "string",
          description: "CRS Report identifier (e.g., 'R46846', 'RL33600')",
        },
      },
      required: ["crsReportId"],
    },
  },
  {
    name: "get_crs_report_text",
    description:
      "📄 CRS Report Full Text: Access the complete text of a Congressional Research Service report for detailed content analysis.",
    inputSchema: {
      type: "object",
      properties: {
        crsReportId: {
          type: "string",
          description: "CRS Report identifier",
        },
        format: {
          type: "string",
          description: "Response format",
          enum: ["json", "xml"],
          default: "json",
        },
      },
      required: ["crsReportId"],
    },
  },

  // ===== HOUSE COMMUNICATIONS TOOLS =====
  {
    name: "search_house_communications",
    description:
      "🏛️ House Communications Search: Find executive communications, presidential messages, memorial letters, and petitions received by the House of Representatives with analysis of executive-legislative interactions.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description:
            'Congress number (e.g., "119" for current, "118" for previous)',
        },
        type: {
          type: "string",
          enum: ["ec", "ml", "pm", "pt"],
          description:
            "Communication type (ec=Executive Communication, ml=Memorial Letter, pm=Presidential Message, pt=Petition)",
        },
        number: {
          type: "string",
          description: "Communication number",
        },
        fromDateTime: {
          type: "string",
          format: "date",
          description: "Start date filter (YYYY-MM-DD format)",
        },
        toDateTime: {
          type: "string",
          format: "date",
          description: "End date filter (YYYY-MM-DD format)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of results to return (1-250)",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
        sort: {
          type: "string",
          enum: ["updateDate+desc", "updateDate+asc"],
          default: "updateDate+desc",
          description: "Sort order",
        },
      },
    },
  },
  {
    name: "get_house_communication_details",
    description:
      "📄 House Communication Analysis: Get detailed information about a specific House communication including strategic analysis, policy impact assessment, and stakeholder relevance.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: 'Congress number (e.g., "119")',
        },
        type: {
          type: "string",
          enum: ["ec", "ml", "pm", "pt"],
          description: "Communication type",
        },
        number: {
          type: "string",
          description: "Communication number",
        },
      },
      required: ["congress", "type", "number"],
    },
  },

  // ===== SENATE COMMUNICATIONS TOOLS =====
  {
    name: "search_senate_communications",
    description:
      "🏛️ Senate Communications Search: Find executive communications, presidential messages, and petitions/memorials received by the Senate with analysis of constitutional functions and executive-legislative relations.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description:
            'Congress number (e.g., "119" for current, "118" for previous)',
        },
        type: {
          type: "string",
          enum: ["ec", "pm", "pom"],
          description:
            "Communication type (ec=Executive Communication, pm=Presidential Message, pom=Petition or Memorial)",
        },
        number: {
          type: "string",
          description: "Communication number",
        },
        fromDateTime: {
          type: "string",
          format: "date",
          description: "Start date filter (YYYY-MM-DD format)",
        },
        toDateTime: {
          type: "string",
          format: "date",
          description: "End date filter (YYYY-MM-DD format)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of results to return (1-250)",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
        sort: {
          type: "string",
          enum: ["updateDate+desc", "updateDate+asc"],
          default: "updateDate+desc",
          description: "Sort order",
        },
      },
    },
  },
  {
    name: "get_senate_communication_details",
    description:
      "📄 Senate Communication Analysis: Get detailed information about a specific Senate communication including constitutional protocol analysis, policy impact, and Senate advice/consent context.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: 'Congress number (e.g., "119")',
        },
        type: {
          type: "string",
          enum: ["ec", "pm", "pom"],
          description: "Communication type",
        },
        number: {
          type: "string",
          description: "Communication number",
        },
      },
      required: ["congress", "type", "number"],
    },
  },

  // ===== NOMINATIONS TOOLS =====
  {
    name: "search_nominations",
    description:
      "🎖️ Presidential Nominations Search: Find presidential nominations for federal positions with analysis of confirmation status, position types, and Senate advice/consent process.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description:
            'Congress number (e.g., "119" for current, "118" for previous)',
        },
        number: {
          type: "string",
          description: "Nomination number",
        },
        fromDateTime: {
          type: "string",
          format: "date",
          description: "Start date filter (YYYY-MM-DD format)",
        },
        toDateTime: {
          type: "string",
          format: "date",
          description: "End date filter (YYYY-MM-DD format)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of results to return (1-250)",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
        sort: {
          type: "string",
          enum: ["updateDate+desc", "updateDate+asc"],
          default: "updateDate+desc",
          description: "Sort order",
        },
      },
    },
  },
  {
    name: "get_nomination_details",
    description:
      "📋 Presidential Nomination Analysis: Get comprehensive information about a specific nomination including significance assessment, confirmation prospects, constitutional framework, and nominee details.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: 'Congress number (e.g., "119")',
        },
        number: {
          type: "string",
          description: "Nomination number",
        },
      },
      required: ["congress", "number"],
    },
  },
  {
    name: "get_nomination_actions",
    description:
      "⚖️ Nomination Process Tracker: Get complete timeline of actions for a nomination including process stage analysis, committee path, confirmation momentum, and Senate procedures.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: "Congress number",
        },
        number: {
          type: "string",
          description: "Nomination number",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of actions to return",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
      },
      required: ["congress", "number"],
    },
  },

  // ===== HOUSE REQUIREMENTS TOOLS =====
  {
    name: "search_house_requirements",
    description:
      "📋 House Requirements Search: Find House procedural requirements, compliance standards, and operational rules with analysis of institutional frameworks and procedural complexity.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description:
            'Congress number (e.g., "119" for current, "118" for previous)',
        },
        number: {
          type: "string",
          description: "Requirement number",
        },
        type: {
          type: "string",
          description: "Requirement type",
        },
        fromDateTime: {
          type: "string",
          format: "date",
          description: "Start date filter (YYYY-MM-DD format)",
        },
        toDateTime: {
          type: "string",
          format: "date",
          description: "End date filter (YYYY-MM-DD format)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of results to return (1-250)",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
        sort: {
          type: "string",
          enum: ["updateDate+desc", "updateDate+asc"],
          default: "updateDate+desc",
          description: "Sort order",
        },
      },
    },
  },
  {
    name: "get_house_requirement_details",
    description:
      "📄 House Requirement Analysis: Get detailed information about a specific House requirement including procedural significance, compliance urgency, institutional impact, and precedent value.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: 'Congress number (e.g., "119")',
        },
        number: {
          type: "string",
          description: "Requirement number",
        },
      },
      required: ["congress", "number"],
    },
  },

  // ===== HOUSE VOTES TOOLS =====
  {
    name: "search_house_votes",
    description:
      "🗳️ House Roll Call Votes Search: Find House voting records with analysis of bipartisan patterns, party-line votes, legislative outcomes, and political dynamics.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description:
            'Congress number (e.g., "119" for current, "118" for previous)',
        },
        session: {
          type: "string",
          description: "Congressional session (1 or 2)",
        },
        rollNumber: {
          type: "string",
          description: "Roll call vote number",
        },
        fromDateTime: {
          type: "string",
          format: "date",
          description: "Start date filter (YYYY-MM-DD format)",
        },
        toDateTime: {
          type: "string",
          format: "date",
          description: "End date filter (YYYY-MM-DD format)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of results to return (1-250)",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
        sort: {
          type: "string",
          enum: ["updateDate+desc", "updateDate+asc"],
          default: "updateDate+desc",
          description: "Sort order",
        },
      },
    },
  },
  {
    name: "get_house_vote_details",
    description:
      "🗳️ House Vote Analysis: Get detailed information about a specific House vote including political significance, bipartisanship assessment, legislative impact, and voting dynamics.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: 'Congress number (e.g., "119")',
        },
        session: {
          type: "string",
          description: "Congressional session",
        },
        rollNumber: {
          type: "string",
          description: "Roll call vote number",
        },
      },
      required: ["congress", "session", "rollNumber"],
    },
  },
  {
    name: "get_house_vote_members",
    description:
      "👥 House Vote Member Positions: Get detailed breakdown of how each House member voted including party cohesion analysis, state delegation patterns, and crossover voting analysis.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: "Congress number",
        },
        session: {
          type: "string",
          description: "Congressional session",
        },
        rollNumber: {
          type: "string",
          description: "Roll call vote number",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 250,
          description: "Number of member records to return",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
      },
      required: ["congress", "session", "rollNumber"],
    },
  },

  // ===== MEMBERS TOOLS =====
  {
    name: "search_members",
    description:
      "👥 Congressional Members Search: Find current and former members of Congress with analysis of party distribution, state representation, chamber composition, and political profiles.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description:
            'Congress number (e.g., "119" for current, "118" for previous)',
        },
        chamber: {
          type: "string",
          enum: ["house", "senate"],
          description: "Chamber filter (House or Senate)",
        },
        state: {
          type: "string",
          description: "State abbreviation (e.g., 'CA', 'TX', 'NY')",
        },
        district: {
          type: "string",
          description: "District number (for House members)",
        },
        party: {
          type: "string",
          description: "Party affiliation (e.g., 'D', 'R', 'I')",
        },
        currentMember: {
          type: "boolean",
          description: "Filter for current members only",
        },
        fromDateTime: {
          type: "string",
          format: "date",
          description: "Start date filter (YYYY-MM-DD format)",
        },
        toDateTime: {
          type: "string",
          format: "date",
          description: "End date filter (YYYY-MM-DD format)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of results to return (1-250)",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
        sort: {
          type: "string",
          enum: ["updateDate+desc", "updateDate+asc"],
          default: "updateDate+desc",
          description: "Sort order",
        },
      },
    },
  },
  {
    name: "get_member_details",
    description:
      "👤 Congressional Member Profile: Get comprehensive information about a specific member including political profile, influence level, committee assignments, leadership positions, and legislative focus.",
    inputSchema: {
      type: "object",
      properties: {
        bioguideId: {
          type: "string",
          description: "Member's Bioguide ID (e.g., 'B001230', 'S000148')",
        },
      },
      required: ["bioguideId"],
    },
  },
  {
    name: "get_member_sponsored_legislation",
    description:
      "📝 Member Sponsored Legislation: Get bills and resolutions sponsored by a specific member with analysis of policy focus areas, legislative success rates, and strategic approach.",
    inputSchema: {
      type: "object",
      properties: {
        bioguideId: {
          type: "string",
          description: "Member's Bioguide ID",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of results to return",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
        sort: {
          type: "string",
          enum: ["updateDate+desc", "updateDate+asc"],
          default: "updateDate+desc",
          description: "Sort order",
        },
      },
      required: ["bioguideId"],
    },
  },
  {
    name: "get_member_cosponsored_legislation",
    description:
      "🤝 Member Cosponsored Legislation: Get bills and resolutions cosponsored by a specific member with analysis of collaboration patterns, bipartisan engagement, and policy alignment.",
    inputSchema: {
      type: "object",
      properties: {
        bioguideId: {
          type: "string",
          description: "Member's Bioguide ID",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of results to return",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
        sort: {
          type: "string",
          enum: ["updateDate+desc", "updateDate+asc"],
          default: "updateDate+desc",
          description: "Sort order",
        },
      },
      required: ["bioguideId"],
    },
  },

  // ===== SUMMARIES TOOLS =====
  {
    name: "search_summaries",
    description:
      "📋 Bill Summaries Search: Find Congressional Research Service (CRS) bill summaries with analysis of policy impact, legislative implications, and strategic context.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description:
            'Congress number (e.g., "119" for current, "118" for previous)',
        },
        billType: {
          type: "string",
          enum: [
            "hr",
            "hres",
            "hjres",
            "hconres",
            "s",
            "sres",
            "sjres",
            "sconres",
          ],
          description: "Bill type filter",
        },
        billNumber: {
          type: "string",
          description: "Bill number",
        },
        currentChamber: {
          type: "string",
          enum: ["house", "senate"],
          description: "Current chamber filter",
        },
        fromDateTime: {
          type: "string",
          format: "date",
          description: "Start date filter (YYYY-MM-DD format)",
        },
        toDateTime: {
          type: "string",
          format: "date",
          description: "End date filter (YYYY-MM-DD format)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of results to return (1-250)",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
        sort: {
          type: "string",
          enum: ["updateDate+desc", "updateDate+asc"],
          default: "updateDate+desc",
          description: "Sort order",
        },
      },
    },
  },
  {
    name: "get_summary_details",
    description:
      "📄 Bill Summary Analysis: Get detailed CRS summary information including policy analysis, legislative context, impact assessment, and strategic implications.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: 'Congress number (e.g., "119")',
        },
        billType: {
          type: "string",
          enum: [
            "hr",
            "hres",
            "hjres",
            "hconres",
            "s",
            "sres",
            "sjres",
            "sconres",
          ],
          description: "Bill type",
        },
        billNumber: {
          type: "string",
          description: "Bill number",
        },
        versionCode: {
          type: "string",
          description: "Summary version code (e.g., 'ih', 'eh', 'enr')",
        },
      },
      required: ["congress", "billType", "billNumber", "versionCode"],
    },
  },

  // ===== TREATY TOOLS =====
  {
    name: "search_treaties",
    description:
      "🌍 International Treaties Search: Find treaties and international agreements with analysis of diplomatic significance, ratification status, and geopolitical context.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description:
            'Congress number (e.g., "119" for current, "118" for previous)',
        },
        number: {
          type: "string",
          description: "Treaty number",
        },
        suffix: {
          type: "string",
          description: "Treaty suffix (e.g., 'A', 'B', 'C')",
        },
        fromDateTime: {
          type: "string",
          format: "date",
          description: "Start date filter (YYYY-MM-DD format)",
        },
        toDateTime: {
          type: "string",
          format: "date",
          description: "End date filter (YYYY-MM-DD format)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of results to return (1-250)",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
        sort: {
          type: "string",
          enum: ["updateDate+desc", "updateDate+asc"],
          default: "updateDate+desc",
          description: "Sort order",
        },
      },
    },
  },
  {
    name: "get_treaty_details",
    description:
      "📜 Treaty Analysis: Get comprehensive information about a specific treaty including diplomatic context, ratification process, strategic implications, and international relations impact.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: 'Congress number (e.g., "119")',
        },
        number: {
          type: "string",
          description: "Treaty number",
        },
        suffix: {
          type: "string",
          description: "Treaty suffix (optional, e.g., 'A', 'B', 'C')",
        },
      },
      required: ["congress", "number"],
    },
  },
  {
    name: "get_treaty_text",
    description:
      "📄 Treaty Text Retrieval: Get the complete legal text of a treaty for detailed content analysis, legal research, and diplomatic review.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: "Congress number",
        },
        number: {
          type: "string",
          description: "Treaty number",
        },
        suffix: {
          type: "string",
          description: "Treaty suffix (optional)",
        },
        format: {
          type: "string",
          enum: ["json", "xml"],
          default: "json",
          description: "Response format (JSON recommended for AI analysis)",
        },
      },
      required: ["congress", "number"],
    },
  },
  {
    name: "get_treaty_actions",
    description:
      "⚖️ Treaty Process Tracker: Get complete timeline of actions for a treaty including ratification process, Senate procedures, diplomatic milestones, and international relations context.",
    inputSchema: {
      type: "object",
      properties: {
        congress: {
          type: "string",
          description: "Congress number",
        },
        number: {
          type: "string",
          description: "Treaty number",
        },
        suffix: {
          type: "string",
          description: "Treaty suffix (optional)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 250,
          default: 20,
          description: "Number of actions to return",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Starting offset for pagination",
        },
      },
      required: ["congress", "number"],
    },
  },
];
