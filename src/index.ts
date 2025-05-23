/**
 * This is the entrypoint file of the application. It communicates the
 * important features of this microfrontend to the app shell. It
 * connects the app shell to the React application(s) that make up this
 * microfrontend.
 */
import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { createHomeDashboardLink } from './components/create-dashboard-link.component';
import { configSchema } from './config-schema';
import NavbarActionButton from "./navbar/navvar-action-button.component";


const moduleName = '@nmrs-community/esm-recapture-extraction-app';

const options = {
  featureName: 'recapture-extraction-app',
  moduleName,
};

/**
 * This tells the app shell how to obtain translation files: that they
 * are JSON files in the directory `../translations` (which you should
 * see in the directory structure).
 */
export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

/**
 * This function performs any setup that should happen at microfrontend
 * load-time (such as defining the config schema) and then returns an
 * object which describes how the React application(s) should be
 * rendered.
 */
export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

/**
 * This named export tells the app shell that the default export of `root.component.tsx`
 * should be rendered when the route matches `root`. The full route
 * will be `openmrsSpaBase() + 'root'`, which is usually
 * `/openmrs/spa/root`.
 */
export const root = getAsyncLifecycle(() => import('./root.component'), options);

/**
 * The following are named exports for the extensions defined in this frontend modules. See the `routes.json` file to see how these are used.
 */
export const recaptureDashboardLink = getSyncLifecycle(
  createHomeDashboardLink({
    name: 'recapture-extraction',
    slot: 'recapture-extraction-dashboard-slot',
    title: 'Recapture Extraction',
  }),
  options,
)

export const navbarButtons = getSyncLifecycle(NavbarActionButton, options);
