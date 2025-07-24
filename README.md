# n8n-nodes-eddie-surf

Transform websites into structured JSON data with AI-powered crawling - no brittle selectors, no complex setup.

## Why Eddie.surf?

Eddie.surf uses Claude Sonnet 4 to intelligently extract data from websites, handling dynamic content, pagination, and complex layouts that break traditional scrapers. Perfect for n8n workflows that need reliable web data.

**What makes it different:**
- **Smart Crawling**: AI understands page content and structure, not just HTML
- **Structured Output**: Get clean JSON data matching your exact schema
- **Workflow-Ready**: Built-in webhooks and polling for seamless n8n integration
- **Cost Effective**: At $0.04-0.06 per page, often cheaper than building your own solution

## Installation

```bash
npm install n8n-nodes-eddie-surf
```

## Quick Start

1. **Get API Key**: Sign up at [eddie.surf](https://eddie.surf) and grab your API key
2. **Add Credentials**: In n8n, create new "Eddie Surf API" credentials  
3. **Start Crawling**: Drop the Eddie.surf node into your workflow

## What You Can Build

**Lead Research Workflows**
- Crawl prospect websites → Extract contact info → Add to CRM
- Monitor competitor pricing → Alert on changes → Update strategy

**Market Intelligence**
- Batch crawl industry sites → Analyze trends → Generate reports
- Track product mentions → Sentiment analysis → Dashboard updates  

**AI Agent Data Sources**
- Web research → Structured data → Feed to language models
- Real-time search → Context gathering → Enhanced AI responses

## Available Operations

- **Crawl**: Extract data from 1-199 URLs with custom JSON schemas
- **Batch Crawl**: Process 200+ URLs efficiently with reduced costs
- **Smart Search**: AI-powered web search with structured results  
- **Get Status**: Monitor job progress and retrieve results

## Example Workflows

### Basic Web Crawling

```json
{
  "urls": "https://example.com, https://another-site.com",
  "context": {"purpose": "Company research"},
  "json": {
    "company_name": {
      "type": "string", 
      "description": "Company name"
    },
    "email": {
      "type": "string",
      "description": "Contact email"
    }
  }
}
```

### Smart Search

```json
{
  "query": "project management software",
  "context": {"intent": "find_businesses"},
  "max_results": 25,
  "website_only": true,
  "skip_duplicate_domains": true
}
```

### Async Workflow Integration

Eddie.surf is built for long-running workflows. Start a crawl job with a webhook callback, then continue your n8n workflow when data is ready:

1. **Start Crawl** → Set `callback_url` to your n8n webhook
2. **Process in Background** → Eddie.surf crawls and extracts data  
3. **Webhook Triggers** → Receive structured results, continue workflow

Perfect for large-scale data extraction that shouldn't block your workflow execution.

## Why This Beats DIY Scraping

| Traditional Scraping | Eddie.surf |
|---------------------|------------|
| Write brittle CSS selectors | Describe what you want in plain English |
| Handle pagination manually | AI automatically follows links |
| Break on site updates | Adapts to layout changes |
| Complex proxy management | Built-in IP handling |
| $1,749/month for ScrapingBee | $0.04-0.06 per page |

## Resources

- **Documentation**: [docs.eddie.surf](https://docs.eddie.surf) - Complete API reference
- **Try It**: [eddie.surf/playground](https://eddie.surf/playground) - Test crawls in your browser  
- **Support**: [eddie.surf/contact](https://eddie.surf/contact) - Get help from the team
- **Issues**: [GitHub Issues](https://github.com/surescaleai/n8n-nodes-eddie-surf/issues) - Report bugs or request features

## License

MIT - see [LICENSE.md](LICENSE.md) for details.

---

Ready to surf the web for data? Install the node and start building smarter workflows with reliable web extraction. 🏄‍♂️