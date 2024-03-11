import { RecipeDropdownItem } from "src/app/modules/recipes/components/recipe-detail/models/dropdown-item.model";

export const dropdownItems: RecipeDropdownItem[] = [
  { name: 'To Shopping List', action: 'Add', class: 'btn-primary' },
  { name: 'Edit Recipe', action: 'Edit', class: 'btn-secondary' },
  { name: 'Delete Recipe', action: 'Delete', class: 'btn-danger' },
];