import React, { PureComponent } from 'react';
import {Input,Button,List,Icon} from 'antd'
import store from './store'

class TodoList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = store.getState()
        this.changeInputValue = this.changeInputValue.bind(this)
        store.subscribe(this.storeChange)
    }
    render() { 
        return (
            <div style={{margin:'10px', width: '600px'}}>
                <h1>React and Redux TodoList</h1>
                <div style={{marginBottom:'10px'}}>
                    <Input 
                        placeholder={this.state.inputValue} 
                        onChange={this.changeInputValue}
                        value={this.state.inputValue}
                        style={{width: '250px',marginRight:'10px'}}/>
                    <Button 
                        type="primary"
                        onClick={this.handleClick}
                    >增加</Button>
                </div>
                <List
                    header={<div>任务列表</div>}
                    bordered
                    dataSource={this.state.list}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[<Icon type="close-circle" theme="filled" key="delete-item" onClick={this.deleteItem.bind(this, index)} />]}
                        > 
                            {index}-{item}
                        </List.Item>
                    )}
                />
            </div>
        );
    }

    changeInputValue(e){
        store.dispatch({
            type: 'changeInput',
            value: e.target.value
        });
    }

    storeChange = () => {
        this.setState(store.getState());
    }

    handleClick = () => {
        store.dispatch({ type: 'addItem' });
    }

    deleteItem(index) {
        store.dispatch({ 
            type: 'deleteItem',
            index 
        });
    }
}
 
export default TodoList;