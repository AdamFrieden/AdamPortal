import { LatLngExpression } from "leaflet";

export interface Trip {
  id: number;
  destination: string;
  country: string;
  date: string;
  position: LatLngExpression;
  description: string;
  photoUrls: string[];
}

export const TravelData: Trip[] = [
  {
    id: 1,
    destination: 'Auckland, New Zealand',
    country: 'New Zealand',
    date: '2015-03-19',
    position: [-36.8485, 174.7633],
    description: 'First trip to New Zealand, enjoyed scenic beaches and city life.',
    photoUrls: [
      'https://www.facebook.com/share/12EjoYff1sF/'
    ]
  },
  {
    id: 2,
    destination: 'Amsterdam, The Netherlands',
    country: 'Netherlands',
    date: '2015-08-29',
    position: [52.3676, 4.9041],
    description: 'Explored the canals, museums, and vibrant city atmosphere.',
    photoUrls: [
      'https://www.facebook.com/share/167H3LseQE/'
    ]
  },
  {
    id: 3,
    destination: 'Brussels, Belgium',
    country: 'Belgium',
    date: '2015-09-01',
    position: [50.8503, 4.3517],
    description: 'Enjoyed Belgian waffles, chocolate, and the famous Grand Place.',
    photoUrls: [
      'https://www.facebook.com/share/167H3LseQE/'
    ]
  },
  {
    id: 4,
    destination: 'Paris, France',
    country: 'France',
    date: '2015-09-04',
    position: [48.8566, 2.3522],
    description: 'Visited the Eiffel Tower, the Louvre, and charming cafés.',
    photoUrls: [
      'https://www.facebook.com/share/167H3LseQE/'
    ]
  },
  {
    id: 5,
    destination: 'Punta Cana, Dominican Republic',
    country: 'Dominican Republic',
    date: '2016-03-20',
    position: [18.5601, -68.3725],
    description: 'Relaxed on pristine beaches and enjoyed tropical weather.',
    photoUrls: [
      'https://www.facebook.com/share/15w4YrroNG/'
    ]
  },
  {
    id: 6,
    destination: 'New Orleans, USA',
    country: 'United States of America',
    date: '2016-05-06',
    position: [29.9511, -90.0715],
    description: 'Savored Creole cuisine, jazz music, and the French Quarter.',
    photoUrls: [
      'https://www.facebook.com/share/18kadVViW9/'
    ]
  },
  {
    id: 7,
    destination: 'Orlando, USA',
    country: 'United States of America',
    date: '2016-09-30',
    position: [28.5383, -81.3792],
    description: 'Theme parks and endless sunshine in central Florida.',
    photoUrls: [
      'https://www.facebook.com/share/1GieAM4rgf/'
    ]
  },
  {
    id: 8,
    destination: 'Miami, USA',
    country: 'United States of America',
    date: '2016-11-11',
    position: [25.7617, -80.1918],
    description: 'Beachfront skyline and vibrant nightlife in South Florida.',
    photoUrls: [
      'https://www.facebook.com/share/1CQEDo2sQ1/'
    ]
  },
  {
    id: 9,
    destination: 'Las Vegas, USA',
    country: 'United States of America',
    date: '2016-12-07',
    position: [36.1699, -115.1398],
    description: 'The Entertainment Capital with dazzling shows and casinos.',
    photoUrls: [
      'https://www.facebook.com/share/15k9VdfoUt/'
    ]
  },
  {
    id: 10,
    destination: 'Reykjavik, Iceland',
    country: 'Iceland',
    date: '2016-12-17',
    position: [64.1466, -21.9426],
    description: 'Chased the Northern Lights during the winter solstice.',
    photoUrls: [
      'https://www.facebook.com/share/19qzSc4h1R/'
    ]
  },
  {
    id: 11,
    destination: 'Toronto, Canada',
    country: 'Canada',
    date: '2017-05-20',
    position: [43.6532, -79.3832],
    description: 'Enjoyed diverse neighborhoods, CN Tower, and Lake Ontario views.',
    photoUrls: [
      'https://www.facebook.com/share/17FnKrbwfF/'
    ]
  },
  {
    id: 12,
    destination: 'Juneau, USA',
    country: 'United States of America',
    date: '2017-06-25',
    position: [58.3019, -134.4197],
    description: 'Alaska’s capital with stunning glaciers and mountainous terrain.',
    photoUrls: [
      'https://www.facebook.com/share/1B3WXdKGtQ/'
    ]
  },
  {
    id: 13,
    destination: 'Skagway, USA',
    country: 'United States of America',
    date: '2017-06-26',
    position: [59.4583, -135.3139],
    description: 'Gateway to the Klondike Gold Rush with historic charm.',
    photoUrls: [
      'https://www.facebook.com/share/1B3WXdKGtQ/'
    ]
  },
  {
    id: 14,
    destination: 'Icy Strait, USA',
    country: 'United States of America',
    date: '2017-06-27',
    position: [58.1336, -135.4437],
    description: 'Remote Alaskan inlet near Hoonah, rich in Native culture.',
    photoUrls: [
      'https://www.facebook.com/share/1B3WXdKGtQ/'
    ]
  },
  {
    id: 15,
    destination: 'Ketchikan, USA',
    country: 'United States of America',
    date: '2017-06-28',
    position: [55.3422, -131.6461],
    description: 'Salmon capital of the world with rich Tlingit heritage.',
    photoUrls: [
      'https://www.facebook.com/share/1B3WXdKGtQ/'
    ]
  },
  {
    id: 16,
    destination: 'Vancouver, Canada',
    country: 'Canada',
    date: '2017-06-30',
    position: [49.2827, -123.1207],
    description: 'Coastal seaport city surrounded by mountains and ocean.',
    photoUrls: [
      'https://www.facebook.com/share/1B3WXdKGtQ/'
    ]
  },
  {
    id: 17,
    destination: 'Portland, USA',
    country: 'United States of America',
    date: '2017-07-01',
    position: [45.5051, -122.6750],
    description: 'Known for its food trucks, breweries, and “Keep Portland Weird.”',
    photoUrls: [
      'https://www.facebook.com/share/1B3WXdKGtQ/'
    ]
  },
  {
    id: 18,
    destination: 'Sutton, Canada',
    country: 'Canada',
    date: '2017-07-20',
    position: [45.1092, -72.6084],
    description: 'Charming Quebec town near scenic mountains and vineyards.',
    photoUrls: []
  },
  {
    id: 19,
    destination: 'Cincinnati, USA',
    country: 'United States of America',
    date: '2017-09-08',
    position: [39.1031, -84.5120],
    description: 'Historic Over-the-Rhine district and famous chili scene.',
    photoUrls: []
  },
  {
    id: 20,
    destination: 'Dublin, Ireland',
    country: 'Ireland',
    date: '2017-11-04',
    position: [53.3498, -6.2603],
    description: 'Toured historic pubs and soaked in the city’s literary heritage.',
    photoUrls: [
      'https://www.facebook.com/share/18cTYkczWJ/'
    ]
  },
  {
    id: 21,
    destination: 'Cape Town, South Africa',
    country: 'South Africa',
    date: '2018-02-18',
    position: [-33.9249, 18.4241],
    description: 'Saw Table Mountain, the Cape Peninsula, and local vineyards.',
    photoUrls: [
      'https://www.facebook.com/share/15ogP3yftD/'
    ]
  },
  {
    id: 22,
    destination: 'Mbabane, Swaziland',
    country: 'Eswatini',
    date: '2018-02-23',
    position: [-26.3055, 31.1367],
    description: 'Visited the mountainous capital of eSwatini (formerly Swaziland).',
    photoUrls: [
      'https://www.facebook.com/share/15ogP3yftD/'
    ]
  },
  {
    id: 23,
    destination: 'Johannesburg, South Africa',
    country: 'South Africa',
    date: '2018-02-26',
    position: [-26.2041, 28.0473],
    description: 'Explored the largest city in South Africa and cultural hubs.',
    photoUrls: [
      'https://www.facebook.com/share/15ogP3yftD/'
    ]
  },
  {
    id: 24,
    destination: 'Nea Moudania, Greece',
    country: 'Greece',
    date: '2018-06-18',
    position: [40.2443, 23.2830],
    description: 'Enjoyed the beaches and fresh seafood on the Chalkidiki peninsula.',
    photoUrls: [
      'https://www.facebook.com/share/1AeCTqwTxx/'
    ]
  },
  {
    id: 25,
    destination: 'San Diego, USA',
    country: 'United States of America',
    date: '2018-12-04',
    position: [32.7157, -117.1611],
    description: 'Known for its zoo, beaches, and near-perfect weather.',
    photoUrls: [
      'https://www.facebook.com/share/14mMiqAa72/'
    ]
  },
  {
    id: 26,
    destination: 'Los Angeles, USA',
    country: 'United States of America',
    date: '2018-12-07',
    position: [34.0522, -118.2437],
    description: 'Hollywood, Santa Monica, and countless cultural neighborhoods.',
    photoUrls: [
      'https://www.facebook.com/share/14mMiqAa72/'
    ]
  },
  {
    id: 27,
    destination: 'Madrid, Spain',
    country: 'Spain',
    date: '2019-08-30',
    position: [40.4168, -3.7038],
    description: 'Experienced the capital’s art museums, parks, and tapas scene.',
    photoUrls: [
      'https://www.instagram.com/p/B2NbyvWAVyQ/?img_index=1'
    ]
  },
  {
    id: 28,
    destination: 'Barcelona, Spain',
    country: 'Spain',
    date: '2019-09-03',
    position: [41.3851, 2.1734],
    description: 'Admired Gaudí’s architecture and lively Catalan culture.',
    photoUrls: [
      'https://www.instagram.com/p/B2NbyvWAVyQ/'
    ]
  },
  {
    id: 29,
    destination: 'Honolulu, USA',
    country: 'United States of America',
    date: '2019-11-09',
    position: [21.3069, -157.8583],
    description: 'Capital of Hawaii, famed Waikiki Beach, and historic Pearl Harbor.',
    photoUrls: [
      'https://www.instagram.com/stories/highlights/17887013737743204/',
      'https://www.instagram.com/p/B40prRygRS-/?img_index=1'
    ]
  },
  {
    id: 30,
    destination: 'Maui, USA',
    country: 'United States of America',
    date: '2019-11-13',
    position: [20.7984, -156.3319],
    description: 'Beautiful beaches and scenic Road to Hana.',
    photoUrls: [
      'https://www.instagram.com/stories/highlights/17887013737743204/',
      'https://www.instagram.com/p/B4_2v_FgTUD/?img_index=1',
      'https://www.instagram.com/p/B4_V_QZAeD3/?img_index=1',
      'https://www.instagram.com/p/B49AhY7ghbN/?img_index=1'
    ]
  },
  {
    id: 31,
    destination: 'Hilo, USA',
    country: 'United States of America',
    date: '2019-11-18',
    position: [19.7297, -155.0907],
    description: 'Gateway to Volcanoes National Park and lush rainforests.',
    photoUrls: [
      'https://www.instagram.com/stories/highlights/17887013737743204/',
      'https://www.instagram.com/p/B5PBpCJAmY_/?img_index=1',
      'https://www.instagram.com/p/B5Ezm4hgq6s/?img_index=7'
    ]
  },
  {
    id: 32,
    destination: 'Miami, USA',
    country: 'United States of America',
    date: '2020-02-01',
    position: [25.7617, -80.1918],
    description: 'Beachfront skyline and vibrant nightlife in South Florida.',
    photoUrls: [
      'https://www.instagram.com/p/B8KylbYAJc1/?img_index=1',
      'https://www.facebook.com/share/1CQEDo2sQ1/'
    ]
  },
  {
    id: 33,
    destination: 'Denver, USA',
    country: 'United States of America',
    date: '2020-03-06',
    position: [39.7392, -104.9903],
    description: 'Mile-High City with Rocky Mountain views and craft breweries.',
    photoUrls: [
      'https://www.instagram.com/p/B9pIiRtgtRF/?img_index=1'
    ]
  },
  {
    id: 34,
    destination: 'Columbia Falls, USA',
    country: 'United States of America',
    date: '2021-08-09',
    position: [48.3700, -114.1819],
    description: 'Gateway to Glacier National Park in Montana.',
    photoUrls: [
      'https://www.instagram.com/stories/highlights/17927170960727193/',
      'https://www.instagram.com/p/CSma_ALAKyz/?img_index=1',
      'https://www.instagram.com/p/CSkmLUFg0bW/?img_index=1'
    ]
  },
  {
    id: 35,
    destination: 'Noord, Aruba',
    country: 'Aruba',
    date: '2021-09-07',
    position: [12.5643, -70.0270],
    description: 'Relaxed in the Caribbean sunshine and explored local beaches.',
    photoUrls: [
      'https://www.instagram.com/stories/highlights/17918088202906837/',
      'https://www.instagram.com/p/CTyG2BvAETs/?img_index=1',
      'https://www.instagram.com/p/CTvlPIhghsY/?img_index=1'
    ]
  },
  {
    id: 36,
    destination: 'San Diego, USA',
    country: 'United States of America',
    date: '2021-11-06',
    position: [32.7157, -117.1611],
    description: 'Return to San Diego for its sunny beaches and attractions.',
    photoUrls: [
      'https://www.facebook.com/share/14mMiqAa72/'
    ]
  },
  {
    id: 37,
    destination: 'Tucson, USA',
    country: 'United States of America',
    date: '2021-11-10',
    position: [32.2226, -110.9747],
    description: 'Desert city surrounded by scenic mountains and saguaro cacti.',
    photoUrls: [
      'https://www.instagram.com/p/CWcTQpLtjFZ/?img_index=7'
    ]
  },
  {
    id: 38,
    destination: 'Phoenix, USA',
    country: 'United States of America',
    date: '2021-11-14',
    position: [33.4484, -112.0740],
    description: 'Explored the Valley of the Sun with cultural and outdoor highlights.',
    photoUrls: [
      'https://www.instagram.com/p/CWcTQpLtjFZ/?img_index=7'
    ]
  },
  {
    id: 39,
    destination: 'Big Sky, USA',
    country: 'United States of America',
    date: '2022-02-02',
    position: [45.2850, -111.4014],
    description: 'Winter sports haven in the mountains of Montana.',
    photoUrls: []
  },
  {
    id: 40,
    destination: 'Los Angeles, USA',
    country: 'United States of America',
    date: '2022-02-10',
    position: [34.0522, -118.2437],
    description: 'Another LA trip for Hollywood highlights and sun-soaked beaches.',
    photoUrls: [
      'https://www.instagram.com/p/CZ_OkDMOcUH/?img_index=1',
      'https://www.instagram.com/p/CZ-dw6tvORJ/?img_index=1',
      'https://www.instagram.com/p/CZ51t4sr9eK/?img_index=1',
      'https://www.instagram.com/p/BrV0tZXgdqG/',
      'https://www.instagram.com/p/B1aHHM6A2M_/?img_index=1'
    ]
  },
  {
    id: 41,
    destination: 'Salt Lake City, USA',
    country: 'United States of America',
    date: '2022-02-28',
    position: [40.7608, -111.8910],
    description: 'Surrounded by mountains, home to Temple Square and ski resorts.',
    photoUrls: []
  },
  {
    id: 42,
    destination: 'Playa del Carmen, Mexico',
    country: 'Mexico',
    date: '2022-08-23',
    position: [20.6274, -87.0799],
    description: 'Enjoyed vibrant nightlife, beaches, and nearby Mayan ruins.',
    photoUrls: [
      'https://www.instagram.com/p/CiDJyDfgA0v/?img_index=1'
    ]
  },
  {
    id: 43,
    destination: 'Bangkok, Thailand',
    country: 'Thailand',
    date: '2022-11-26',
    position: [13.7563, 100.5018],
    description: 'Explored bustling markets and iconic temples.',
    photoUrls: [
      'https://www.facebook.com/share/15dxLmGdRN/',
      'https://www.instagram.com/stories/highlights/17960555885229471/',
      'https://www.instagram.com/p/CmrlKSeuZxG/?img_index=1'
    ]
  },
  {
    id: 44,
    destination: 'Chiang Mai, Thailand',
    country: 'Thailand',
    date: '2022-11-29',
    position: [18.7061, 98.9817],
    description: 'Visited lush mountains and historic temples in northern Thailand.',
    photoUrls: [
      'https://www.facebook.com/share/15dxLmGdRN/',
      'https://www.instagram.com/stories/highlights/17960555885229471/',
      'https://www.instagram.com/p/Cmx5TFmt2UM/?img_index=1',
      'https://www.instagram.com/p/Cmu94Rhtn_R/?img_index=1'
    ]
  },
  {
    id: 45,
    destination: 'Koh Phi Phi, Thailand',
    country: 'Thailand',
    date: '2022-12-03',
    position: [7.7396, 98.7784],
    description: 'Enjoyed crystal-clear waters and island nightlife.',
    photoUrls: [
      'https://www.facebook.com/share/15dxLmGdRN/',
      'https://www.instagram.com/stories/highlights/17960555885229471/',
      'https://www.instagram.com/p/Cm0FiJqNrNP/?img_index=1'
    ]
  },
  {
    id: 46,
    destination: 'Railay Beach, Thailand',
    country: 'Thailand',
    date: '2022-12-06',
    position: [8.0071, 98.8388],
    description: 'Rock climbing paradise with stunning limestone cliffs.',
    photoUrls: [
      'https://www.facebook.com/share/15dxLmGdRN/',
      'https://www.instagram.com/stories/highlights/17960555885229471/',
      'https://www.instagram.com/p/Cm1gvMpO_0R/?img_index=1'
    ]
  },
  {
    id: 47,
    destination: 'Salt Lake City, USA',
    country: 'United States of America',
    date: '2023-03-15',
    position: [40.7608, -111.8910],
    description: 'Return visit for more skiing, hiking, and city exploration.',
    photoUrls: []
  },
  {
    id: 48,
    destination: 'Denver, USA',
    country: 'United States of America',
    date: '2023-04-05',
    position: [39.7392, -104.9903],
    description: 'Another Mile-High City adventure in the shadow of the Rockies.',
    photoUrls: []
  },
  {
    id: 49,
    destination: 'Playa Junquillal, Costa Rica',
    country: 'Costa Rica',
    date: '2023-08-26',
    position: [10.1387, -85.7694],
    description: 'Surfing, lush jungles, and pura vida vibes.',
    photoUrls: [
      'https://www.instagram.com/p/CxRCznjPzmb/?img_index=1'
    ]
  },
  {
    id: 50,
    destination: 'Lima, Peru',
    country: 'Peru',
    date: '2023-11-11',
    position: [-12.0464, -77.0428],
    description: 'Tasted amazing Peruvian cuisine and explored historic downtown.',
    photoUrls: [
      'https://www.instagram.com/p/CzpRPW5Lc1-/?img_index=1',
      'https://www.instagram.com/p/CzkGMgPMjBy/?img_index=1'
    ]
  },
  {
    id: 51,
    destination: 'Cusco, Peru',
    country: 'Peru',
    date: '2023-11-14',
    position: [-13.5320, -71.9675],
    description: 'Gateway to Machu Picchu and rich Inca heritage.',
    photoUrls: [
      'https://www.instagram.com/p/CzzV7bevmet/?img_index=1',
      'https://www.instagram.com/p/CzurrWBMdUB/?img_index=1'
    ]
  },
  {
    id: 52,
    destination: 'Puerto Maldonado, Peru',
    country: 'Peru',
    date: '2023-11-19',
    position: [-12.5933, -69.1890],
    description: 'Amazon rainforest adventure with remarkable biodiversity.',
    photoUrls: [
      'https://www.instagram.com/p/Cz8Hm_NgHfO/?img_index=1'
    ]
  },
  {
    id: 53,
    destination: 'Steamboat Springs, USA',
    country: 'United States of America',
    date: '2024-03-06',
    position: [40.4848, -106.8317],
    description: 'Famous for Champagne Powder skiing and hot springs.',
    photoUrls: []
  },
  {
    id: 54,
    destination: 'Salt Lake City, USA',
    country: 'United States of America',
    date: '2024-03-20',
    position: [40.7608, -111.8910],
    description: 'Third trip to SLC, exploring new neighborhoods and ski resorts.',
    photoUrls: []
  },
  {
    id: 55,
    destination: 'Prague, Czech Republic',
    country: 'Czech Republic',
    date: '2024-04-26',
    position: [50.0755, 14.4378],
    description: 'Admired medieval architecture and historic squares.',
    photoUrls: [
      'https://www.instagram.com/p/C6xA7tjsbwY/?img_index=1'
    ]
  },
  {
    id: 56,
    destination: 'Munich, Germany',
    country: 'Germany',
    date: '2024-04-30',
    position: [48.1351, 11.5820],
    description: 'Bavarian culture, beer gardens, and a charming city center.',
    photoUrls: [
      'https://www.instagram.com/p/C6xKltpMmKT/?img_index=1'
    ]
  },
  {
    id: 57,
    destination: 'Cincinnati, USA',
    country: 'United States of America',
    date: '2024-09-07',
    position: [39.1031, -84.5120],
    description: 'Yet another Cincinnati visit, enjoying local fare and history.',
    photoUrls: [
      'https://www.instagram.com/p/CY2Rs9MFOjm/?img_index=1'
    ]
  },
  {
    id: 58,
    destination: 'Killarney, Ireland',
    country: 'Ireland',
    date: '2024-09-21',
    position: [52.0597, -9.5064],
    description: 'Explored the scenic lakes and mountains of County Kerry.',
    photoUrls: [
      'https://www.facebook.com/share/18cTYkczWJ/',
      'https://www.instagram.com/p/DAzMWRFvRFl/?img_index=1'
    ]
  },
  {
    id: 59,
    destination: 'Galway, Ireland',
    country: 'Ireland',
    date: '2024-09-24',
    position: [53.2707, -9.0568],
    description: 'Coastal city known for live music and a vibrant arts scene.',
    photoUrls: [
      'https://www.facebook.com/share/18cTYkczWJ/',
      'https://www.instagram.com/p/DBFIFQ9PMvb/?img_index=1'
    ]
  },
  {
    id: 60,
    destination: 'Dublin, Ireland',
    country: 'Ireland',
    date: '2024-09-26',
    position: [53.3498, -6.2603],
    description: 'Second visit to Dublin, discovering more of its rich heritage.',
    photoUrls: [
      'https://www.facebook.com/share/18cTYkczWJ/',
      'https://www.instagram.com/p/DBSFUF3vGzd/?img_index=1'
    ]
  }
];