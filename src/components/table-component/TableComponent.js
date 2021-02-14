import React, { Component } from 'react'
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import * as actions from '../../actions';
import { Link } from 'react-router-dom'


class TableComponent extends Component {
    componentDidMount() { 
        this.props.fetchUsers.then();
     }

    renderTable() {
        let finalValues = [];
        this.props.users.map((user) => {
            let temp = (<tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.company.name}</td>
                <td><Link to={"/user/"+user.id}>User Posts</Link></td>
            </tr>)
            finalValues.push(temp);
        })
        return finalValues;
    }
    componentDidUpdate() {
        this.renderTable()
    }
    render() {
        return (
            <div className="table-component">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Company Name</th>
                        <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: actions.fetchUsers(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent)
