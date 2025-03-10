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