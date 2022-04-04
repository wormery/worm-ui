export function install(component) {
    component.install = (app) => {
        app.component(component.name, component);
    };
}
//# sourceMappingURL=install.js.map