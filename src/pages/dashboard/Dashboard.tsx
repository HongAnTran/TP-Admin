// import React from 'react'
// import { google } from 'googleapis';
// import { OAuth2Client } from 'google-auth-library';

// const oAuth2Client = new OAuth2Client(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URL
// );

// oAuth2Client.setCredentials({
//   refresh_token: process.env.GOOGLE_REFRESH_TOKEN
// });

// async function getAnalyticsData() {
//   const analytics = google.analyticsreporting({
//     version: 'v4',
//     auth: oAuth2Client
//   });

//   const response = await analytics.reports.batchGet({
//     requestBody: {
//       reportRequests: [
//         {
//           viewId: process.env.GOOGLE_VIEW_ID,
//           dateRanges: [
//             {
//               startDate: '7daysAgo',
//               endDate: 'today'
//             }
//           ],
//           metrics: [
//             {
//               expression: 'ga:sessions'
//             },
//             {
//               expression: 'ga:pageviews'
//             }
//           ],
//           dimensions: [
//             {
//               name: 'ga:date'
//             }
//           ]
//         }
//       ]
//     }
//   });

//   return response.data;
// }

export default function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}
