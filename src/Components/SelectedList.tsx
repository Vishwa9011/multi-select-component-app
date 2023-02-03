import React from 'react'
import './SelectedList.css'
import { IoClose } from 'react-icons/io5'

type Props = {
     selectedItems: string[];
     deleteItem(value: string): void
}

function SelectedList({ selectedItems, deleteItem }: Props) {
     return (
          <>
               {selectedItems.length ?
                    <section className='selected-item-container'>
                         {selectedItems.map((item, index) => (
                              <SelectedItem key={index} item={item} deleteItem={deleteItem} />
                         ))}
                    </section>
                    :
                    null
               }
          </>
     )
}

export default SelectedList

interface IItem {
     item: string;
     deleteItem(value: string): void
}

function SelectedItem({ item, deleteItem }: IItem) {
     return (
          <div className='selected-item'>
               <p className='flex prevent-select' >{item}</p>
               <button className='flex close' onClick={() => deleteItem(item)}><IoClose /></button>
          </div>
     )
}