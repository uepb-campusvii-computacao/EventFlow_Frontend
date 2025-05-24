import { Item } from './Item';
import { Wrapper } from './Wrapper';

export const SideBar = {
  Main: ({
    items,
  }: {
    items: {
      to: string;
      title: string;
      icon?: React.ReactNode;
      className?: string;
      titleClassName?: string;
    }[];
  }) => (
    <Wrapper>
      {items.map((item) => (
        <Item key={item.to} {...item} />
      ))}
    </Wrapper>
  ),
  Wrapper: Wrapper,
  Item: Item,
};
