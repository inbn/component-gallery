import React from 'react';
import PropTypes from 'prop-types';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              // Optimization for Repeat Views
              if (sessionStorage.fontsLoadedFoutWithClass) {
                document.documentElement.dataset.fontsLoaded = sessionStorage.fontsLoadedFoutWithClass;
                return;
              }

              if ('fonts' in document) {
                document.fonts.load('1em DM Sans').then(() => {
                  const fontsLoaded = sessionStorage.fontsLoadedFoutWithClass ? JSON.parse(sessionStorage.fontsLoadedFoutWithClass) : [];
                  if (!fontsLoaded.includes('DMSans-Regular')) {
                    fontsLoaded.push('DMSans-Regular');
                    document.documentElement.dataset.fontsLoaded = JSON.stringify(fontsLoaded);
                  }
                  sessionStorage.fontsLoadedFoutWithClass = JSON.stringify(fontsLoaded);
                })

                document.fonts.load('italic 1em DM Sans').then(() => {
                  const fontsLoaded = sessionStorage.fontsLoadedFoutWithClass ? JSON.parse(sessionStorage.fontsLoadedFoutWithClass) : [];
                  if (!fontsLoaded.includes('DMSans-Italic')) {
                    fontsLoaded.push('DMSans-Italic');
                    document.documentElement.dataset.fontsLoaded = JSON.stringify(fontsLoaded);
                  }
                  sessionStorage.fontsLoadedFoutWithClass = JSON.stringify(fontsLoaded);
                })

                document.fonts.load('500 1em DM Sans').then(() => {
                  const fontsLoaded = sessionStorage.fontsLoadedFoutWithClass ? JSON.parse(sessionStorage.fontsLoadedFoutWithClass) : [];
                  if (!fontsLoaded.includes('DMSans-Medium')) {
                    fontsLoaded.push('DMSans-Medium');
                    document.documentElement.dataset.fontsLoaded = JSON.stringify(fontsLoaded);
                  }
                  sessionStorage.fontsLoadedFoutWithClass = JSON.stringify(fontsLoaded);
                })

                document.fonts.load('700 1em DM Sans').then(() => {
                  const fontsLoaded = sessionStorage.fontsLoadedFoutWithClass ? JSON.parse(sessionStorage.fontsLoadedFoutWithClass) : [];
                  if (!fontsLoaded.includes('DMSans-Bold')) {
                    fontsLoaded.push('DMSans-Bold');
                    document.documentElement.dataset.fontsLoaded = JSON.stringify(fontsLoaded);
                  }
                  sessionStorage.fontsLoadedFoutWithClass = JSON.stringify(fontsLoaded);
                })

                // Promise.all([
                //   document.fonts.load('1em DM Sans'),
                //   document.fonts.load('italic 1em DM Sans'),
                //   document.fonts.load('500 1em DM Sans'),
                //   document.fonts.load('700 1em DM Sans')
                // ]).then(function () {
                //   document.documentElement.setAttribute('data-fonts-loaded', true);
                //
                //   // Optimization for Repeat Views
                //   sessionStorage.fontsLoadedFoutWithClass = true;
                // });
              }
            })();`,
          }}
        />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
