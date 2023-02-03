import * as React from 'react';
import './App.css'
import Select from './Components/Select';
import SelectedList from './Components/SelectedList';
import { Country } from './CountryNames';

function App() {
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const updateList = (value: string) => {
        if (selectedItems.includes(value)) return;
        setSelectedItems(p => ([...p, value]))
    }

    const deleteItem = (value: string) => {
        const filteredData = selectedItems.filter((item) => {
            return item != value
        })
        setSelectedItems(filteredData);
    }

    return (
        <>
            <header className='header'>
                <h1>Multi Select Component</h1>
            </header>
            <main className='main-container'>
                <SelectedList deleteItem={deleteItem} selectedItems={selectedItems} />
                <Select suggesstions={Country} updateList={updateList} />
            </main>
        </>
    )
}

export default App
