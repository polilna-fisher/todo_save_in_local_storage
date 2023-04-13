
(function () {
    let storageKey

    function createAppTitle(title){
        let appTitle = document.createElement('h2')
        appTitle.innerHTML = title
        return appTitle
    }
    function createToDoItemForm(){
        let form = document.createElement('form')
        let input = document.createElement('input')
        let buttonWrapper = document.createElement('div')
        let button = document.createElement('button')

        form.classList.add('input-group', 'mb-3')
        input.classList.add('form-control')
        input.placeholder = 'Введите название нового дела'
        buttonWrapper.classList.add('input-group-append')
        button.classList.add('btn', 'btn-primary')
        button.textContent = 'Добавить дело'
        button.disabled = true

        buttonWrapper.append(button)
        form.append(input)
        form.append(buttonWrapper)


        input.addEventListener('input', function (){
            if(input.value !== ''){
                button.disabled = false
            }else{
                button.disabled = true
            }
        })

        return {form, input, button}

    }
    function createToDoList(){
        let list = document.createElement('ul')
        list.classList.add('list-group')
        return list
    }

    function createTodoItem(name, isDone){
        let item = document.createElement('li')

        let buttonGroup = document.createElement('div')
        let doneButton = document.createElement('button')
        let deleteButton = document.createElement('button')

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center')
        item.textContent = name

        buttonGroup.classList.add('btn-group', 'btn-group-sm')
        doneButton.classList.add('btn', 'btn-success')
        doneButton.textContent = 'Готово'
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить'

        buttonGroup.append(doneButton)
        buttonGroup.append(deleteButton)
        item.append(buttonGroup)

        if(isDone){
            item.classList.add('list-group-item-success')
        }

        return{
            item, doneButton, deleteButton
        }
    }

    const tasks = [{
        name: 'MAMA',
        done: true
    }]

    function addItemListeners (todoItem) {

        todoItem.doneButton.addEventListener('click', function (){
            let storageItems =  JSON.parse(localStorage.getItem(storageKey))
            let itemName =  todoItem.item.textContent
            itemName = itemName.split('Г')[0]
            let successItem
            console.log(444, itemName)
            if(storageItems){
                successItem = storageItems.filter(el => {
                    return el.name === itemName
                })
            }
            todoItem.item.classList.toggle('list-group-item-success')
            // successItem[0].done = true

            if(todoItem.item.classList.contains('list-group-item-success')){
                successItem[0].done = true
            }else{
                successItem[0].done = false
            }
            console.log(565656, successItem)

            localStorage.setItem(storageKey, JSON.stringify(storageItems))
        })

        todoItem.deleteButton.addEventListener('click', function (){
            let storageItems =  JSON.parse(localStorage.getItem(storageKey))
            let itemName =  todoItem.item.textContent
            itemName = itemName.split('Г')[0]
            if(confirm('Вы уверены?')){
                todoItem.item.remove()
                let deletedItem = storageItems.find(el => {
                    return el.name === itemName
                })
                console.log(storageItems)
                console.log(itemName)
                console.log(3323, deletedItem.name)
                storageItems = storageItems.filter(el => {
                    return el !== deletedItem
                })
                localStorage.setItem(storageKey, JSON.stringify(storageItems))
            }
        })
    }

    function createDefaultItems(){
        let storageItems =  JSON.parse(localStorage.getItem(storageKey))
        let todoItems
        if (storageItems){
            todoItems = storageItems.map(el => {
                const todoItem = createTodoItem(el.name, el.done)
                addItemListeners(todoItem)
                 return todoItem
             })
        }


           return todoItems

    }

    function createTodoApp( container, title = 'Список дел', key){
        if(!key) {
            alert('Нету кея')
            return
        }
        storageKey = key

        let todoAppTitle = createAppTitle(title)
        let todoItemForm = createToDoItemForm()
        let todoList = createToDoList()


        let todoDefaultTasks = createDefaultItems(tasks)
        if(todoDefaultTasks){
            todoDefaultTasks.forEach(item => {
                todoList.append(item.item)
            })
        }


        container.append(todoAppTitle)
        container.append(todoItemForm.form)
        container.append(todoList)

        console.log(222, todoItemForm.form)
        todoItemForm.form.addEventListener('submit', function (e){
            e.preventDefault()
            if(!todoItemForm.input.value){
                return
            }

            let todoItem = createTodoItem(todoItemForm.input.value)
            addItemListeners(todoItem)

            todoList.append(todoItem.item)


            let storageArr = localStorage.getItem(storageKey)

            if(!storageArr){
                storageArr = []
            }else{
                storageArr = JSON.parse(storageArr)
            }



   // добавление в локал сторадж
            let storageItem = {
                name: todoItemForm.input.value,
                done: '',
            }
            storageArr.push(storageItem)
            localStorage.setItem(storageKey, JSON.stringify(storageArr));

            todoItemForm.button.disabled = true
            todoItemForm.input.value = ''
        })
    }



    window.createTodoApp = createTodoApp



})()