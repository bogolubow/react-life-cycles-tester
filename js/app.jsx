import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    class LifeCyclesTester extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                number: 0,
                counter: 0,
            }

            // zmienna przechowująca id dla timeout
            this.timeout = 0;
            console.log(this.constructor.name,'constructor');
        }

        componentWillMount() {
            console.log(this.constructor.name,'componentWillMount');
        }

        componentDidMount() {

            // zmien state po 7 sekundach
            this.timeout = setTimeout(()=> {

                console.log(this.constructor.name, 'change state');
                    
                this.setState({
                    number: Math.random(),
                    counter: this.state.counter + 1,
                });

            }, 7000);

            console.log(this.constructor.name,'componentDidMount');
            console.log('---');
        }

        componentWillReceiveProps(nextProps) {
            console.log(this.constructor.name,'componentWillReceiveProps(nextProps)', nextProps);
        }

        shouldComponentUpdate(nextProps, nextState) {
            console.log(this.constructor.name,'shouldComponentUpdate(nextProps, nextState)', nextProps, nextState);
            return true;
        }

        componentWillUpdate(nextProps, nextState) {
            console.log(this.constructor.name,'componentWillUpdate(nextProps, nextState)', nextProps, nextState);
        }

        componentDidUpdate() {
            console.log(this.constructor.name,'componentDidUpdate');
            console.log('---');
        }

        componentWillUnmount() {
            clearTimeout(this.timeout);

            console.log(this.constructor.name, 'componentWillUnmount');
        }


        render() {
            
            console.log(this.constructor.name, 'render');

            return <div>{this.constructor.name}, {this.state.number}, {this.state.counter}, {this.props.data.join('-')}</div>
        }
    }

    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [1, 2, 3],
                unmount: false,
            }

            // zmienne przechowujące id dla timeout
            this.timeoutData = 0;
            this.timeoutUnmount = 0;

            console.log(this.constructor.name, 'constructor');
        }

        componentDidMount() {

            // dodaj do zmiennej this.state.data
            // losową liczbę po 3 sekundach
            this.timeoutData = setTimeout(()=>{

                const data = this.state.data.slice();
                data.push(Math.random());

                console.log(this.constructor.name, 'change data');
                this.setState({
                    data: data,
                });

            }, 3000);

            // zmień wartość this.state.unmount na true
            // po 11 sekundach
            this.timeoutUnmount = setTimeout(()=> {
                
                console.log(this.constructor.name, 'change unmount');
                
                this.setState({
                    unmount: true,
                });

            }, 11000);
        }

        render() {
            
            console.log(this.constructor.name, 'render');

            // jeśli this.state.unmount jest true
            // nic nie wyswietlaj
            if(this.state.unmount) {
                return null;
            }

            // zwraca komponent LifeCycleTester,
            // do którego przekazujemy zawartośc this.state.data
            // poprzez właściwość o nazwie data
            return <LifeCyclesTester data={ this.state.data } />;
        }

        componentWillUnmount() {
            clearTimeout(this.timeoutData);
            clearTimeout(this.timeoutUnmount);
        }
    }

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
