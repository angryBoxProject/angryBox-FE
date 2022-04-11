import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
    const testServer = async () => {
        try {
            const data = await axios
                .get('https://angrybox.link/hello')
                .then(res => console.log(res));
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="App">
            <button onClick={testServer}>testButton</button>
        </div>
    );
}

export default App;
