import React, { useState, useEffect, useRef } from 'react'
import './Select.css'

type Props = {
     suggesstions: string[];
     updateList(value: string): void
}

const Select = ({ suggesstions, updateList }: Props) => {
     const listRef = useRef<HTMLUListElement>(null);
     const containerRef = useRef<HTMLDivElement>(null);
     const [showList, setShowlist] = useState(false);
     const [text, setText] = useState<string>('');
     const [listIndex, setListIndex] = useState<number>(-1)
     const [filterSuggesstion, setFilterSuggesstion] = React.useState<string[]>([])

     const listClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, suggesstion: string) => {
          e.stopPropagation();
          updateList(suggesstion)
          setShowlist(false)
          setText('')
     }

     const AddTextInList = (e: React.KeyboardEvent<HTMLInputElement>) => {
          const listText = document.querySelector(".focus-li");
          const listLength = listRef.current?.children.length;
          if (e.key === 'ArrowDown') {
               if (!listLength) return;
               if (!showList) setShowlist(true);
               setListIndex(index => (index < listLength - 1) ? index + 1 : 0);
          } else if (e.key === 'ArrowUp') {
               if (!listLength) return;
               setListIndex(index => (index >= 0) ? index - 1 : 0);
          } else if (e.key == 'Enter') {
               if (listIndex >= 0) {
                    if (!listText?.textContent) return
                    updateList(listText?.textContent);
                    setShowlist(false)
                    setText('')
                    setListIndex(-1);
               } else {
                    updateList(text);
                    setShowlist(false)
                    setText('')
               }
          } else if (e.key === 'Escape') {
               setShowlist(false);
          }
     }

     const scrollIntoView = (position: any) => {
          listRef.current?.scrollTo({
               top: position,
               behavior: 'smooth'
          })
     }

     const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setShowlist(true);
          var text = e.target.value;
          setText(text);
          const filterData = suggesstions.filter((option) => {
               return option.toLowerCase().includes(text.toLowerCase());
          })
          setFilterSuggesstion([...filterData]);
     }


     useEffect(() => {
          if (!listRef || listIndex < 0) return;

          let listItems = (listRef.current?.children);
          if (!listItems) return;

          scrollIntoView(listItems[listIndex].offsetTop)
     }, [listIndex])


     return (
          <div className='multi-select-container'>
               <div className="selected-items"></div>
               <div className="multi-select" onClick={() => { setShowlist(true) }} ref={containerRef}               >
                    <div className="multi-select-input" >
                         <input tabIndex={0} type="text" value={text} onKeyDown={AddTextInList} onChange={HandleChange} placeholder='Type your value...' />
                    </div>
                    {<ul ref={listRef} className={`suggesstion-list ${showList ? "active" : ""}`}>
                         {(text.length ? filterSuggesstion : suggesstions).map((suggesstion, index) => (
                              <li key={index} data-list-item className={`${index === listIndex ? 'focus-li' : ''}`} onClick={(e) => listClick(e, suggesstion)}>{suggesstion}</li>
                         ))}
                    </ul>}
               </div>
               <div className='overlay' onClick={() => { setShowlist(false) }}></div>
          </div>
     )
}

export default Select