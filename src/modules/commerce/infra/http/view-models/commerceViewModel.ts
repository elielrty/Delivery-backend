import { Commerce } from '@modules/commerce/entities/commerce';
import { userViewModel } from '@modules/user/infra/http/view-models/userViewModel';

export class commerceViewModel {
  static toHTTP(commerce: Commerce) {
    const props = {
      name: commerce.name,
      cnpj: commerce.cnpj,
      isOpen: commerce.isOpen,
      phone: commerce.phone,
      category: commerce.category,
      users: commerce.users?.map(user => userViewModel.toHTTP(user)),
    };
    const { id } = commerce;

    return { id, ...{ props } };
  }
}
