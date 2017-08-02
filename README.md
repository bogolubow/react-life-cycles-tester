# react-life-cycles-tester

Cykle życia w aplikacji React.js

Efekty można zobaczyć pod tym adresem: https://bogolubow.github.io/react-life-cycles-tester/
Pamiętaj, aby zajrzeć do konsoli!

## Opis metod

- **constructor**, etoda uruchamiana na początku tworzenia instancji obiektu. Czyli w momencie, gdy komponent ma zostać zamontowany

- **componentWillMount**, etoda uruchamiana przed zamontowaniem komponentu, ale po wykonaniu działań w konstruktorze

- **componentDidMount**, metoda uruchomiona, kiedy komponent został umieszczony już w drzewie DOM

- **componentWillReceiveProps**, metoda ruruchamiana w momencie gdy komponent otrzyma nowe właściwości. Może się to zdarzyć w momencie, gdy komponent rodzic przekazuje przez właściwość (prop) swój stan (state). Wtedy całość jest renderowania ponownie, a komponent dziecko otrzymuje nową wartość dla danej właściwości.

- **shouldComponentUpdate**, metoda wywoływana kiedy komponent ma być ponownie przerenderowany. W tym momencie możemy zadecydować czy ma zostać zaaktualizowany czy nie - zwracając true lub false

- **componentWillUpdate**, metoda uruchamiana przed aktualizacją komponentu. Czyli komponent wcześniej został już zamontowany, a teraz ma być zaaktualizowany.

- **componentDidUpdate**, metoda uruchamiana po zaaktualizownaiu komponentu.


- **componentWillUnmount**, metoda uruchamiana przed usunięciem komponentu z drzewa DOM. Należy zaznaczyć, że komponent musi być przed tym zamontowany.

## Przypadki użycia

W naszej aplikacji mamy dwa komponenty `App` i `LifeCyclesTester`.

Komponent `App` renderuje komponent `LifeCyclesTester`, w przypadku gdy właściwość `this.state.unmount` jest fałszywa.

Dodatkowo do `LifeCyclesTester` jest przekazyna wartość `this.state.data`jako właściwość `data`.

W metodzie `componentDidMount()` definiujemy dwa timeout-y. W pierwszym dodajemy losową liczbę do `this.state.data`. W drugim ustawiamy `this.state.unmount` na `true`.

Natomiast w komponencie `LifeCyclesTester` stworzyliśmy wszystkie opisane wyżej metody i dodaliśmy do nich console.log-i z odpowiednią zawartością.

W tym komponencie mamy jeszcze timeout, który zmienia `this.state.number` oraz `this.state.counter`.

### Zamontowanie komponentu

Po uruchomieniu strony zostanie zamontowany komponent i w konsoli będziemy mogli zobaczyć:

```
App constructor
App render
LifeCyclesTester constructor
LifeCyclesTester componentWillMount
LifeCyclesTester render
LifeCyclesTester componentDidMount

```

### Zmiana props

Po 3 sekundach uruchamiany jest timeout, który dodaje do `this.state.data` dodatkową losową liczbę co powoduje, że właściwość `data` przekazywana do `LifeCyclesTester` się zmienia. Efekt tego widzimy w konsoli:

```
App change data
App render
LifeCyclesTester componentWillReceiveProps(nextProps) 
LifeCyclesTester shouldComponentUpdate(nextProps, nextState) 
LifeCyclesTester componentWillUpdate(nextProps, nextState)
LifeCyclesTester render
LifeCyclesTester LifeCyclesTester componentDidUpdate
```

### Zmiana state

Po 7 sekundach urachamiany jest timeout, który zmienia stan dla `LifeCyclesTester`, co powoduje wyświetlenie w consoli poniższych danych:

```
LifeCyclesTester change state
LifeCyclesTester shouldComponentUpdate(nextProps, nextState)
LifeCyclesTester componentWillUpdate(nextProps, nextState)
LifeCyclesTester render
LifeCyclesTester LifeCyclesTester componentDidUpdate
```

### Odmontowanie komponentu

Po 11 sekundach wywoływany jest timeout, który zmienia stan `this.state.unmount` na `true`, co powoduje, że `App::render()` zwraca `null` czyli `LifeCyclesTester` nie jest już wyświelany - ten komponent zostanie odmontowany. W konsoli zobaczymy:

```
App change unmount
App render
LifeCyclesTester componentWillUnmount
```