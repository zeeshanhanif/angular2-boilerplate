import {Component, bootstrap, FORM_DIRECTIVES,CORE_DIRECTIVES} from 'angular2/angular2'

@Component({
	selector:'app',
	template: `
			<h1>{{appTitle}}</h1>
			`,
	directives : [FORM_DIRECTIVES,CORE_DIRECTIVES]
})
class AppComponent {
	public appTitle = "Hello Angular 2"
}

bootstrap(AppComponent);	