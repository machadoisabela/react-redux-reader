import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { listCategories, selectCategory } from "../actions/categoryActions";
import  Typography  from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class CatoriesList extends Component {

    handleSelectCategory = (category) => {
        this.props.dispatch(selectCategory(category))
    }


    componentDidMount(){        
        API.getAllCategories().then((response) => this.props.dispatch(listCategories(response)))
    }

    render() {
        
        const { categories } = this.props.categories.categories;


        return (
            <div className="categories-list">               
                {categories && categories.length && categories.map((category) => (
                    <Link to={`/${category.name}`} onClick={() => this.handleSelectCategory(category.name)}>
                        <Card className="categories-card" key={category.name}>
                            <CardContent>                           
                                <Typography className="categories-name">
                                    {category.name} 
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        )
    }
}


function mapStateToProps(categories){
    return categories
}

export default connect(mapStateToProps, null)(CatoriesList)
