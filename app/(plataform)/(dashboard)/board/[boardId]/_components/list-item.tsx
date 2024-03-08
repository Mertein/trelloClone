import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";
import { ElementRef, useRef, useState } from "react";

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

export const ListItem = ({
  index,
  data, 
} : ListItemProps) => {

  const textArea = useRef<ElementRef<'textarea'>>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textArea.current?.focus();
    })
  }


  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div 
        className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
      >
        <ListHeader
          data={data}
          onAddCard={enableEditing}
        />
      </div>
    </li>
  )

}