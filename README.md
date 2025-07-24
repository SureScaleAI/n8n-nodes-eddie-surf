# n8n-nodes-eddie-surf

n8n community nodes for Eddie.surf web crawling and intelligent search.

## What is Eddie.surf?

Eddie.surf is an AI-powered web crawling and search platform that extracts structured data from websites. It provides:

- **Web Crawling**: Extract structured data from 1-199 URLs (or 200+ with batch processing)
- **Smart Search**: AI-powered search across the web with customizable results
- **Async Processing**: Webhook callbacks for long-running crawl jobs
- **Flexible Data Extraction**: Define custom JSON schemas for data extraction

## Installation

```bash
npm install n8n-nodes-eddie-surf
```

## Configuration

1. Get your Eddie.surf API key from [your dashboard](https://eddie.surf/dashboard)
2. In n8n, create new Eddie.surf API credentials
3. Enter your API key in the credentials configuration

## Available Nodes

### Eddie.surf Node

A regular node for initiating Eddie.surf operations:

#### Operations

- **Crawl**: Crawl 1-199 URLs and extract structured data
- **Crawl Batch**: Batch crawl 200+ URLs with optimized processing  
- **Smart Search**: AI-powered search across the web
- **Get Status**: Check the status of crawl or search jobs

#### Key Features

- **Flexible Data Extraction**: Define custom JSON schemas
- **Advanced Options**: Control crawl depth, timeout, callback modes
- **Webhook Integration**: Set callback URLs for async processing
- **Smart Search**: Web-wide search with customizable filters
- **Comprehensive Validation**: Built-in parameter validation and error handling

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

### Async Crawling with Webhooks

1. **Start Crawl**: Use Eddie.surf node with `callback_url` parameter
2. **Process Results**: Set up webhook endpoint or trigger node to receive results
3. **Continue Workflow**: Process extracted data when crawl completes

## API Reference

All operations support the full Eddie.surf API specification:

- **Crawl Parameters**: urls, context, json, max_depth, max_pages, timeout_per_page, callback_url, callback_mode, rules, include_technical, mock
- **Smart Search Parameters**: query, context, max_results, website_only, skip_duplicate_domains, rules, additional_guidelines, callback_url, mock  
- **Status Parameters**: job_id, job_type (crawl/smart-search), site_id (optional)

## Support

- **Documentation**: [Eddie.surf Docs](https://eddie.surf/docs)
- **Issues**: [GitHub Issues](https://github.com/surescaleai/n8n-nodes-eddie-surf/issues)
- **API Support**: [Eddie.surf Support](https://eddie.surf/support)

## License

MIT - see [LICENSE.md](LICENSE.md) for details.

## Contributing

Contributions welcome! Please read our contributing guidelines and submit pull requests.