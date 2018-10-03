import MockAdapter from 'axios-mock-adapter';

import MessengerClient from '../MessengerClient';

const ACCESS_TOKEN = '1234567890';

let axios;
let _create;
beforeEach(() => {
  axios = require('axios'); // eslint-disable-line global-require
  _create = axios.create;
});

afterEach(() => {
  axios.create = _create;
});

const createMock = () => {
  const client = new MessengerClient(ACCESS_TOKEN);
  const mock = new MockAdapter(client.axios);
  return { client, mock };
};

describe('persona api', () => {
  describe('#createPersona', () => {
    it('should call messages api to create a persona', async () => {
      const { client, mock } = createMock();

      const persona = {
        name: 'kpman',
        profile_picture_url: 'https://i.imgur.com/zV6uy4T.jpg',
      };

      const reply = { id: '2222146701193608' };

      mock
        .onPost(`/me/personas?access_token=${ACCESS_TOKEN}`, persona)
        .reply(200, reply);

      const res = await client.createPersona(persona);

      expect(res).toEqual(reply);
    });
  });

  describe('#getPersona', () => {
    it('should get persona with the id given', async () => {
      const { client, mock } = createMock();

      const reply = {
        name: 'hi',
        profile_picture_url:
          'https://scontent.xx.fbcdn.net/v/t1.0-9/43055736_2343727682322567_9131520390248529920_n.jpg?_nc_cat=109&oh=f2f5331dd864345deaf2a8cb0f694644&oe=5C51B81B',
        id: '311884619589478',
      };

      mock
        .onGet(`/311884619589478?access_token=${ACCESS_TOKEN}`)
        .reply(200, reply);

      const res = await client.getPersona('311884619589478');

      expect(res).toEqual(reply);
    });
  });

  describe('#getAllPersonas', () => {
    it('should call messages api to get all personas created', async () => {
      const { client, mock } = createMock();

      const reply = {
        data: [
          {
            name: '7',
            profile_picture_url:
              'https://scontent.xx.fbcdn.net/v/t1.0-9/43110262_364897654281734_5040981928241528832_n.jpg?_nc_cat=101&oh=0e85b01626a298357fc4fe79378c88de&oe=5C2388C9',
            id: '1007240332817468',
          },
          {
            name: '6',
            profile_picture_url:
              'https://scontent.xx.fbcdn.net/v/t1.0-9/43003407_364897624281737_7686948852233928704_n.jpg?_nc_cat=100&oh=d9af64f90dfe76bd500d7508f0dfe090&oe=5C1BF43E',
            id: '243523459665626',
          },
          {
            name: '5',
            profile_picture_url:
              'https://scontent.xx.fbcdn.net/v/t1.0-9/42878396_364897590948407_7544338642173427712_n.jpg?_nc_cat=107&oh=a293e175c24e05abe9aaef9b49b96dd8&oe=5C5D5D06',
            id: '313552169447330',
          },
        ],
        paging: {
          cursors: {
            before:
              'QVFIUktTaXVuTUtsYUpVdFhlQjVhV2tRMU1jY0tRekU0d1NVTS1fZAGw4YmFYakU3ay1vRnlKbUh4VktROWxvazQzLXQzbm1YN0M3SHRKaVBGTTVCNFlyZAXBn',
            after:
              'QVFIUl96LThrbmJrU3gzOHdsR2JaZA2dDM01uaEJNaUZArWnNTNHBhQi1iZA3lvakk2YWlUR3F5bUV3UDJYZAWVxYnJyOFA1VnJwZAG9GUEVzOGRMZAzRsV08wdW1R',
          },
          next:
            'https://graph.facebook.com/v3.0/138523840252451/personas?access_token=0987654321&limit=25&after=QVFIUl96LThrbmJrU3gzOHdsR2JaZA2dDM01uaEJNaUZArWnNTNHBhQi1iZA3lvakk2YWlUR3F5bUV3UDJYZAWVxYnJyOFA1VnJwZAG9GUEVzOGRMZAzRsV08wdW1R',
        },
      };

      mock.onGet(`/me/personas?access_token=${ACCESS_TOKEN}`).reply(200, reply);

      const res = await client.getAllPersonas();

      expect(res).toEqual(reply);
    });
  });

  describe('#getPersonas', () => {
    it('should call messages api to get personas with cursor', async () => {
      const { client, mock } = createMock();

      const reply = {
        data: [
          {
            name: '7',
            profile_picture_url:
              'https://scontent.xx.fbcdn.net/v/t1.0-9/43110262_364897654281734_5040981928241528832_n.jpg?_nc_cat=101&oh=0e85b01626a298357fc4fe79378c88de&oe=5C2388C9',
            id: '1007240332817468',
          },
          {
            name: '6',
            profile_picture_url:
              'https://scontent.xx.fbcdn.net/v/t1.0-9/43003407_364897624281737_7686948852233928704_n.jpg?_nc_cat=100&oh=d9af64f90dfe76bd500d7508f0dfe090&oe=5C1BF43E',
            id: '243523459665626',
          },
          {
            name: '5',
            profile_picture_url:
              'https://scontent.xx.fbcdn.net/v/t1.0-9/42878396_364897590948407_7544338642173427712_n.jpg?_nc_cat=107&oh=a293e175c24e05abe9aaef9b49b96dd8&oe=5C5D5D06',
            id: '313552169447330',
          },
        ],
        paging: {
          cursors: {
            before:
              'QVFIUktTaXVuTUtsYUpVdFhlQjVhV2tRMU1jY0tRekU0d1NVTS1fZAGw4YmFYakU3ay1vRnlKbUh4VktROWxvazQzLXQzbm1YN0M3SHRKaVBGTTVCNFlyZAXBn',
            after:
              'QVFIUl96LThrbmJrU3gzOHdsR2JaZA2dDM01uaEJNaUZArWnNTNHBhQi1iZA3lvakk2YWlUR3F5bUV3UDJYZAWVxYnJyOFA1VnJwZAG9GUEVzOGRMZAzRsV08wdW1R',
          },
          next:
            'https://graph.facebook.com/v3.0/138523840252451/personas?access_token=0987654321&limit=25&after=QVFIUl96LThrbmJrU3gzOHdsR2JaZA2dDM01uaEJNaUZArWnNTNHBhQi1iZA3lvakk2YWlUR3F5bUV3UDJYZAWVxYnJyOFA1VnJwZAG9GUEVzOGRMZAzRsV08wdW1R',
        },
      };

      const cursor =
        'QVFIUmRJYXR4Y3dBN1JpcU5pU0lfLWhZAS0IzMjZADZAWxWYksxLWVHdW1HSnJmV21paEZA3NEl2RW5LY25fRFZAnZAkg2OVBJR0VLZAXIzeFRTZAGFrSldjMVRlV3Fn';

      mock
        .onGet(`/me/personas?access_token=${ACCESS_TOKEN}&after=${cursor}`)
        .reply(200, reply);

      const res = await client.getPersonas(cursor);

      expect(res).toEqual(reply);
    });
  });

  describe('#deletePersona', () => {
    it('should call messages api to delete persona', async () => {
      const { client, mock } = createMock();

      const personaId = '291604368115617';

      const reply = {
        success: true,
      };

      mock
        .onDelete(`/${personaId}?access_token=${ACCESS_TOKEN}`)
        .reply(200, reply);

      const res = await client.deletePersona(personaId);

      expect(res).toEqual(reply);
    });
  });
});
