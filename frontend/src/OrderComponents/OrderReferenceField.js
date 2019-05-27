import React, {Component} from 'react';
import {NumberInput, ReferenceInput, SelectInput} from 'react-admin';
import {Field, FieldArray} from 'redux-form';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

class OrderReferenceField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            references: props.record
        };
    }

    render() {
        const references = this.state.references;
        return (
            <span>
        <FieldArray name="products" component={renderOrderReferences} products={references}/>
      </span>
        )
    }
}

const renderOrderReferences = ({fields, meta, ...custom}) => {
    if (fields.length === 0) {
        fields.push({});
    }
    return (
        <div layout="row">
            <div>
                {fields.map((order, index) => (
                    <div layout="row" key={index}>
                        <div>
                            <Field name={`${order}.quantity`}
                                   style={{minWidth: 260}}
                                   label="Quantidade"
                                   component={renderField}
                                   source={`${order}.quantity`}
                            />
                        </div>
                        <div>
                            <Field name={`${order}.product`}
                                   style={{minWidth: 260}}
                                   label="Produto"
                                   component={renderReferenceInput}
                                   source={`${order}.product`}
                            />
                        </div>
                    </div>
                ))}
                <Button style={{left: 300}} variant="fab" onClick={() => {
                    fields.push({});
                }}><AddIcon/> </Button>
                <Button style={{left: 320}} variant="fab" onClick={() => {
                    fields.pop();
                }}><RemoveIcon/> </Button>
            </div>
        </div>
    )
};

const renderField = (({input, label, meta, ...custom}) => {
    console.log(custom);
    return (
        <FormControl>
            <NumberInput
                source={custom.source}
                label={label}
                {...input}
                {...custom}
            />
        </FormControl>
    )
});

const renderReferenceInput = (({input, label, meta, ...custom}) => {
    return (
        <FormControl>
            <ReferenceInput label={label} source={custom.source} reference="products">
                <SelectInput optionText="name"/>
            </ReferenceInput>
        </FormControl>
    )
});

export default OrderReferenceField;