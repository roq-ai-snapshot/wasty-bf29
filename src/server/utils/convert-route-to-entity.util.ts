const mapping: Record<string, string> = {
  'inventory-items': 'inventory_item',
  supermarkets: 'supermarket',
  users: 'user',
  'waste-items': 'waste_item',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
