// Using built-in URL constructor - no import needed
import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IRequestOptions,
  NodeConnectionType,
  NodeOperationError,
} from 'n8n-workflow';

export class EddieSurf implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Eddie.surf',
    name: 'eddieSurf',
    icon: 'file:eddie.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Web crawling and smart search with Eddie.surf',
    defaults: {
      name: 'Eddie.surf',
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: 'eddieApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Crawl',
            value: 'crawl',
            description: 'Crawl 1-199 URLs and extract data',
            action: 'Crawl urls',
          },
          {
            name: 'Crawl Batch',
            value: 'crawlBatch',
            description: 'Batch crawl 200+ URLs with optimized processing',
            action: 'Batch crawl urls',
          },
          {
            name: 'Smart Search',
            value: 'smartSearch',
            description: 'AI-powered search across websites',
            action: 'Smart search websites',
          },
          {
            name: 'Get Status',
            value: 'getStatus',
            description: 'Check the status of a crawl or search job',
            action: 'Get job status',
          },
        ],
        default: 'crawl',
      },

      // Crawl operation fields
      {
        displayName: 'URLs',
        name: 'urls',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['crawl', 'crawlBatch'],
          },
        },
        default: '',
        placeholder: 'https://example.com, https://example2.com',
        description: 'Comma-separated list of URLs to crawl',
        required: true,
      },
      {
        displayName: 'Context',
        name: 'context',
        type: 'json',
        displayOptions: {
          show: {
            operation: ['crawl', 'crawlBatch', 'smartSearch'],
          },
        },
        default: '{}',
        description: 'Context object to guide AI processing and data extraction',
        required: true,
      },
      {
        displayName: 'JSON Schema',
        name: 'jsonSchema',
        type: 'json',
        displayOptions: {
          show: {
            operation: ['crawl', 'crawlBatch'],
          },
        },
        default: '{}',
        description: 'JSON schema defining the structure of data to extract',
        required: true,
      },
      {
        displayName: 'Search Query',
        name: 'query',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['smartSearch'],
          },
        },
        default: '',
        description: 'The search query to find relevant content',
        required: true,
      },

      // Optional fields
      {
        displayName: 'Advanced Options',
        name: 'advancedOptions',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        displayOptions: {
          show: {
            operation: ['crawl', 'crawlBatch', 'smartSearch'],
          },
        },
        options: [
          {
            displayName: 'Max Depth',
            name: 'maxDepth',
            type: 'number',
            default: 3,
            description: 'Maximum link depth to follow (1-10)',
          },
          {
            displayName: 'Max Pages',
            name: 'maxPages',
            type: 'number',
            default: 15,
            description: 'Maximum number of pages to crawl',
          },
          {
            displayName: 'Max Results',
            name: 'maxResults',
            type: 'number',
            default: 10,
            displayOptions: {
              show: {
                '/operation': ['smartSearch'],
              },
            },
            description: 'Maximum number of search results to return (1-5000)',
          },
          {
            displayName: 'Website Only',
            name: 'websiteOnly',
            type: 'boolean',
            default: false,
            displayOptions: {
              show: {
                '/operation': ['smartSearch'],
              },
            },
            description: 'Whether to search only within the specified websites',
          },
          {
            displayName: 'Skip Duplicate Domains',
            name: 'skipDuplicateDomains',
            type: 'boolean',
            default: false,
            displayOptions: {
              show: {
                '/operation': ['smartSearch'],
              },
            },
            description: 'Whether to skip results from duplicate domains',
          },
          {
            displayName: 'Timeout Per Page',
            name: 'timeoutPerPage',
            type: 'number',
            default: 30,
            description: 'Timeout per page in seconds (1-180)',
          },
          {
            displayName: 'Callback URL',
            name: 'callbackUrl',
            type: 'string',
            default: '',
            description: 'Optional webhook URL for job completion notifications',
          },
          {
            displayName: 'Callback Mode',
            name: 'callbackMode',
            type: 'options',
            options: [
              {
                name: 'Once',
                value: 'once',
              },
              {
                name: 'Multi',
                value: 'multi',
              },
            ],
            default: 'once',
            description: 'Callback mode for notifications',
          },
          {
            displayName: 'Rules',
            name: 'rules',
            type: 'string',
            default: '',
            placeholder: 'Extract pricing, Extract contact info',
            description: 'Comma-separated list of custom processing instructions',
          },
          {
            displayName: 'Include Technical Data',
            name: 'includeTechnical',
            type: 'boolean',
            default: false,
            description: 'Whether to include technical data collection (costs 1 additional credit per page)',
          },
          {
            displayName: 'Mock Mode',
            name: 'mock',
            type: 'boolean',
            default: false,
            description: 'Whether to enable test mode without using credits',
          },
        ],
      },

      // Status operation fields
      {
        displayName: 'Job Type',
        name: 'jobType',
        type: 'options',
        displayOptions: {
          show: {
            operation: ['getStatus'],
          },
        },
        options: [
          {
            name: 'Crawl Job',
            value: 'crawl',
            description: 'Check status of a crawl or batch crawl job',
          },
          {
            name: 'Smart Search Job',
            value: 'smart-search',
            description: 'Check status of a smart search job',
          },
        ],
        default: 'crawl',
        description: 'Type of job to check status for',
        required: true,
      },
      {
        displayName: 'Job ID',
        name: 'jobId',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['getStatus'],
          },
        },
        default: '',
        description: 'The job ID to check status for',
        required: true,
      },
      {
        displayName: 'Site ID',
        name: 'siteId',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['getStatus'],
            jobType: ['crawl'],
          },
        },
        default: '',
        description: 'Optional: Check status of individual site within the crawl job',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let responseData;

        if (operation === 'crawl') {
          responseData = await executeCrawl.call(this, i);
        } else if (operation === 'crawlBatch') {
          responseData = await executeCrawlBatch.call(this, i);
        } else if (operation === 'smartSearch') {
          responseData = await executeSmartSearch.call(this, i);
        } else if (operation === 'getStatus') {
          responseData = await executeGetStatus.call(this, i);
        } else {
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, {
            itemIndex: i,
          });
        }

        returnData.push({
          json: responseData,
          pairedItem: { item: i },
        });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: { error: error instanceof Error ? error.message : String(error) },
            pairedItem: { item: i },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}

async function executeCrawl(this: IExecuteFunctions, itemIndex: number): Promise<any> {
  const urls = this.getNodeParameter('urls', itemIndex) as string;
  const context = this.getNodeParameter('context', itemIndex) as object;
  const jsonSchema = this.getNodeParameter('jsonSchema', itemIndex) as object;
  const advancedOptions = this.getNodeParameter('advancedOptions', itemIndex) as any;

  // Validate URLs
  const urlList = urls
    .split(',')
    .map(url => url.trim())
    .filter(url => url.length > 0);
  if (urlList.length === 0) {
    throw new NodeOperationError(this.getNode(), 'At least one URL is required', { itemIndex });
  }
  if (urlList.length > 199) {
    throw new NodeOperationError(
      this.getNode(),
      'Crawl operation supports maximum 199 URLs. Use Crawl Batch for more.',
      { itemIndex }
    );
  }

  // Validate URL format (basic check)
  for (const url of urlList) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      throw new NodeOperationError(this.getNode(), `Invalid URL format: ${url} (must start with http:// or https://)`, { itemIndex });
    }
  }

  const requestBody: any = {
    urls: urlList,
    context,
    json: jsonSchema,
  };

  // Validate and set advanced options
  if (advancedOptions.maxDepth) {
    if (advancedOptions.maxDepth < 1 || advancedOptions.maxDepth > 10) {
      throw new NodeOperationError(this.getNode(), 'Max Depth must be between 1 and 10', {
        itemIndex,
      });
    }
    requestBody.max_depth = advancedOptions.maxDepth;
  }
  if (advancedOptions.maxPages) {
    if (advancedOptions.maxPages < 1) {
      throw new NodeOperationError(this.getNode(), 'Max Pages must be at least 1', { itemIndex });
    }
    requestBody.max_pages = advancedOptions.maxPages;
  }
  if (advancedOptions.timeoutPerPage) {
    if (advancedOptions.timeoutPerPage < 1 || advancedOptions.timeoutPerPage > 180) {
      throw new NodeOperationError(
        this.getNode(),
        'Timeout Per Page must be between 1 and 180 seconds',
        { itemIndex }
      );
    }
    requestBody.timeout_per_page = advancedOptions.timeoutPerPage;
  }
  if (advancedOptions.callbackUrl) requestBody.callback_url = advancedOptions.callbackUrl;
  if (advancedOptions.callbackMode) requestBody.callback_mode = advancedOptions.callbackMode;
  if (advancedOptions.includeTechnical)
    requestBody.include_technical = advancedOptions.includeTechnical;
  if (advancedOptions.rules) {
    const rulesList = advancedOptions.rules
      .split(',')
      .map((rule: string) => rule.trim())
      .filter((rule: string) => rule.length > 0);
    if (rulesList.length > 0) requestBody.rules = rulesList;
  }
  if (advancedOptions.mock) requestBody.mock = advancedOptions.mock;

  const options: IRequestOptions = {
    method: 'POST',
    url: '/crawl',
    body: requestBody,
    json: true,
  };

  return await this.helpers.requestWithAuthentication.call(this, 'eddieApi', options);
}

async function executeCrawlBatch(this: IExecuteFunctions, itemIndex: number): Promise<any> {
  const urls = this.getNodeParameter('urls', itemIndex) as string;
  const context = this.getNodeParameter('context', itemIndex) as object;
  const jsonSchema = this.getNodeParameter('jsonSchema', itemIndex) as object;
  const advancedOptions = this.getNodeParameter('advancedOptions', itemIndex) as any;

  // Validate URLs
  const urlList = urls
    .split(',')
    .map(url => url.trim())
    .filter(url => url.length > 0);
  if (urlList.length === 0) {
    throw new NodeOperationError(this.getNode(), 'At least one URL is required', { itemIndex });
  }
  if (urlList.length < 200) {
    throw new NodeOperationError(
      this.getNode(),
      'Crawl Batch requires minimum 200 URLs. Use Crawl for fewer URLs.',
      { itemIndex }
    );
  }

  // Validate URL format (basic check)
  for (const url of urlList) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      throw new NodeOperationError(this.getNode(), `Invalid URL format: ${url} (must start with http:// or https://)`, { itemIndex });
    }
  }

  const requestBody: any = {
    urls: urlList,
    context,
    json: jsonSchema,
  };

  // Validate and set advanced options
  if (advancedOptions.maxDepth) {
    if (advancedOptions.maxDepth < 1 || advancedOptions.maxDepth > 10) {
      throw new NodeOperationError(this.getNode(), 'Max Depth must be between 1 and 10', {
        itemIndex,
      });
    }
    requestBody.max_depth = advancedOptions.maxDepth;
  }
  if (advancedOptions.maxPages) {
    if (advancedOptions.maxPages < 1) {
      throw new NodeOperationError(this.getNode(), 'Max Pages must be at least 1', { itemIndex });
    }
    requestBody.max_pages = advancedOptions.maxPages;
  }
  if (advancedOptions.timeoutPerPage) {
    if (advancedOptions.timeoutPerPage < 1 || advancedOptions.timeoutPerPage > 180) {
      throw new NodeOperationError(
        this.getNode(),
        'Timeout Per Page must be between 1 and 180 seconds',
        { itemIndex }
      );
    }
    requestBody.timeout_per_page = advancedOptions.timeoutPerPage;
  }
  if (advancedOptions.callbackUrl) requestBody.callback_url = advancedOptions.callbackUrl;
  if (advancedOptions.callbackMode) requestBody.callback_mode = advancedOptions.callbackMode;
  if (advancedOptions.includeTechnical)
    requestBody.include_technical = advancedOptions.includeTechnical;
  if (advancedOptions.rules) {
    const rulesList = advancedOptions.rules
      .split(',')
      .map((rule: string) => rule.trim())
      .filter((rule: string) => rule.length > 0);
    if (rulesList.length > 0) requestBody.rules = rulesList;
  }
  if (advancedOptions.mock) requestBody.mock = advancedOptions.mock;

  const options: IRequestOptions = {
    method: 'POST',
    url: '/crawl-batch',
    body: requestBody,
    json: true,
  };

  return await this.helpers.requestWithAuthentication.call(this, 'eddieApi', options);
}

async function executeSmartSearch(this: IExecuteFunctions, itemIndex: number): Promise<any> {
  const query = this.getNodeParameter('query', itemIndex) as string;
  const context = this.getNodeParameter('context', itemIndex) as object;
  const advancedOptions = this.getNodeParameter('advancedOptions', itemIndex) as any;

  // Validate query
  if (!query || query.trim().length === 0) {
    throw new NodeOperationError(this.getNode(), 'Search query is required', { itemIndex });
  }

  const requestBody: any = {
    query: query.trim(),
    context,
  };

  // Validate and set smart search options
  if (advancedOptions.maxResults) {
    if (advancedOptions.maxResults < 1 || advancedOptions.maxResults > 5000) {
      throw new NodeOperationError(this.getNode(), 'Max Results must be between 1 and 5000', {
        itemIndex,
      });
    }
    requestBody.max_results = advancedOptions.maxResults;
  }
  if (advancedOptions.websiteOnly) requestBody.website_only = advancedOptions.websiteOnly;
  if (advancedOptions.skipDuplicateDomains) requestBody.skip_duplicate_domains = advancedOptions.skipDuplicateDomains;
  if (advancedOptions.rules) {
    const rulesList = advancedOptions.rules
      .split(',')
      .map((rule: string) => rule.trim())
      .filter((rule: string) => rule.length > 0);
    if (rulesList.length > 0) requestBody.rules = rulesList;
  }
  if (advancedOptions.callbackUrl) requestBody.callback_url = advancedOptions.callbackUrl;
  if (advancedOptions.mock) requestBody.mock = advancedOptions.mock;

  const options: IRequestOptions = {
    method: 'POST',
    url: '/smart-search',
    body: requestBody,
    json: true,
  };

  return await this.helpers.requestWithAuthentication.call(this, 'eddieApi', options);
}

async function executeGetStatus(this: IExecuteFunctions, itemIndex: number): Promise<any> {
  const jobType = this.getNodeParameter('jobType', itemIndex) as string;
  const jobId = this.getNodeParameter('jobId', itemIndex) as string;
  const siteId = this.getNodeParameter('siteId', itemIndex) as string;

  // Validate job ID
  if (!jobId || jobId.trim().length === 0) {
    throw new NodeOperationError(this.getNode(), 'Job ID is required', { itemIndex });
  }

  // Build URL based on job type
  let url: string;
  if (jobType === 'smart-search') {
    url = `/smart-search/${jobId.trim()}`;
  } else {
    // Default to crawl endpoint
    url = `/crawl/${jobId.trim()}`;
    if (siteId && siteId.trim().length > 0) {
      url += `/${siteId.trim()}`;
    }
  }

  const options: IRequestOptions = {
    method: 'GET',
    url,
    json: true,
  };

  return await this.helpers.requestWithAuthentication.call(this, 'eddieApi', options);
}
