export type Route = {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
};
