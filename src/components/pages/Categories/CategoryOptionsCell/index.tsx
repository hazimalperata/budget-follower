import {MdDelete} from "react-icons/md";
import Button from "@/components/atoms/Button";
import {Category} from "@/types/category";
import {useCallback} from "react";
import {deleteCategory} from "@/lib/features/categories/categorySlice";
import {useAppDispatch} from "@/lib/hooks";

type CategoryOptionsCellProps = {
  category: Category;
}

export default function CategoryOptionsCell(props: CategoryOptionsCellProps) {
  const {category} = props;

  const dispatch = useAppDispatch();

  const onDeleteCategory = useCallback(() => {
    dispatch(deleteCategory(category.id));
  }, [category, dispatch]);

  return (
    <Button
      variant="borderless"
      size="medium"
      icon={MdDelete}
      onClick={onDeleteCategory}
    />
  )
}
