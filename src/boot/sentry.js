import { boot } from 'quasar/wrappers'
import * as Sentry from '@sentry/browser'

export default boot(({ app, router }) => {
  Sentry.init({
    app,
    dsn: import.meta.env.VITE_DSN,
    integrations: [
        Sentry.browserTracingIntegration({ router })
    ],
  });
  Sentry.captureMessage('it works?')
});

// import { boot } from "quasar/wrappers";
// import * as Sentry from "@sentry/browser";
// import * as Integrations from "@sentry/integrations";

// export default boot(({ Vue }) => {
//   Sentry.init({
//     dsn: "http://192.168.68.124:5080",
//     integrations: [
//       new Integrations.Vue({ Vue, attachProps: true }),
//       new Integrations.RewriteFrames({
//         iteratee(frame) {
//           frame.abs_path = frame.abs_path.split("?")[0];

//           return frame;
//         },
//       }),
//     ],
//   });
// });