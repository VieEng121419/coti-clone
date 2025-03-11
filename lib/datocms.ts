const DATOCMS_ENDPOINT = 'https://graphql.datocms.com/';
const DATOCMS_TOKEN = '4039fd7cd89f4cd288ed0b01e48e84';

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  totalEvents: number;
  totalMembers: number;
  growthRate: number;
  avatar: {
    url: string;
    title: string;
    alt: string;
  };
  createdBy: {
    id: string;
    name: string;
  };
  _createdAt: string;
  _updatedAt: string;
}

export interface Story {
  id: string;
  name: string;
  sapo: string;
  description: string;
  telegram: string;
  linkedin: string;
  twitter: string;
  avatar: {
    url: string;
    title: string;
    alt: string;
  };
  video: {
    url: string;
    title: string;
  };
  _createdAt: string;
  _updatedAt: string;
}

export async function fetchEvents(first: number = 10, skip: number = 0) {
  const response = await fetch(DATOCMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DATOCMS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        {
          allEvents(first: ${first}, skip: ${skip}, orderBy: _createdAt_DESC) {
            id
            title
            description
            location
            startDateTime
            endDateTime
            totalEvents
            totalMembers
            growthRate
            avatar {
              url
              title
              alt
            }
            createdBy {
              id
              name
            }
            _createdAt
            _updatedAt
          }
          _allEventsMeta {
            count
          }
        }
      `
    }),
  });

  const data = await response.json();
  return {
    events: data.data.allEvents as Event[],
    total: data.data._allEventsMeta.count as number,
  };
}

export async function fetchStories(first: number = 4, skip: number = 0) {
  const response = await fetch(DATOCMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DATOCMS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `{ 
        allStories(first: ${first}, skip: ${skip}, orderBy: _createdAt_DESC) { 
          id 
          name 
          sapo 
          description 
          telegram 
          linkedin 
          twitter 
          avatar { 
            url 
            title 
            alt 
          }
          video 
          _createdAt 
          _updatedAt 
        } 
        _allStoriesMeta { 
          count 
        } 
      }`,
    }),
  });

  const data = await response.json();
  return {
    stories: data.data.allStories as Story[],
    total: data.data._allStoriesMeta.count as number,
  };
}


interface IdeaCategory {
  id: string;
  name: string;
}

interface Idea {
  id: string;
  name: string;
  description: string;
  category: IdeaCategory;
  upvote: number;
  _publishedAt: string;
}

interface IdeasResponse {
  data: {
    allIdeas: Idea[];
    _allIdeasMeta: {
      count: number;
    };
  };
}

export async function fetchIdeas(
  limit: number = 10,
  skip: number = 0,
  search: string = "",
  orderBy: string[] = ["_publishedAt_DESC"]
): Promise<IdeasResponse> {
  try {
    const response = await fetch(DATOCMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DATOCMS_TOKEN}`,
      },
      body: JSON.stringify({
        query: `query($limit: IntType, $skip: IntType, $search: String!, $orderBy: [IdeaModelOrderBy!]) {
          allIdeas(
            first: $limit,
            skip: $skip,
            filter: {name: {matches: {pattern: $search}}},
            orderBy: $orderBy
          ) {
            id
            name
            description
            category {
              id
              name
            }
            upvote
            _publishedAt
          }
          _allIdeasMeta {
            count
          }
        }`,
        variables: { limit, skip, search, orderBy }
      })
    });

    const { data }: IdeasResponse = await response.json();
    return { data };
  } catch (error) {
    console.error('Error fetching ideas:', error);
    throw error;
  }
}

// Add new function to fetch categories
export async function fetchCategories() {
  const response = await fetch(DATOCMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': DATOCMS_TOKEN,
    },
    body: JSON.stringify({
      query: "{ allCategories { id name _createdAt _updatedAt } }"
    })
  });

  const { data } = await response.json();
  return data.allCategories;
}

export async function fetchIdeasByCategory(
  limit: number = 10,
  skip: number = 0,
  search: string = "",
  categoryId: string = null,
  orderBy: string[] = ["_publishedAt_DESC"]
): Promise<IdeasResponse> {
  try {
    const response = await fetch(DATOCMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DATOCMS_TOKEN}`,
      },
      body: JSON.stringify({
        query: `query($limit: IntType, $skip: IntType, $search: String!, $categoryId: ItemId, $orderBy: [IdeaModelOrderBy!]) {
          allIdeas(
            first: $limit,
            skip: $skip,
            filter: {
              name: {matches: {pattern: $search}},
              ${categoryId ? 'category: {eq: $categoryId}' : ''}
            },
            orderBy: $orderBy
          ) {
            id
            name
            description
            category {
              id
              name
            }
            upvote
            _publishedAt
          }
          _allIdeasMeta(
            filter: {
              name: {matches: {pattern: $search}},
              ${categoryId ? 'category: {eq: $categoryId}' : ''}
            }
          ) {
            count
          }
        }`,
        variables: { limit, skip, search, categoryId, orderBy }
      })
    });

    const { data }: IdeasResponse = await response.json();
    return { data };
  } catch (error) {
    console.error('Error fetching ideas:', error);
    throw error;
  }
}