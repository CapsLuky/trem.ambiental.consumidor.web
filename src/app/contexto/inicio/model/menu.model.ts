export class MenuModel {
  label!: string;
  visualizar!: boolean;
  subMenu!: SubMenuModel[];
}

export class SubMenuModel {
  label!: string;
  url!: string;
  parentId!: string;
  inativo!: boolean;
  visualizar!: boolean;
}