export function install(component: any) {
  component.install = (app: any) => {
    app.component(component.name, component);
  };
}
