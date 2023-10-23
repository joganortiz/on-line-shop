import { MoocBackendApp } from '@apps/BackendApp';

try {
	// start project
	new MoocBackendApp().start();
} catch (error) {
	console.log(error);
}
