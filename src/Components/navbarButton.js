import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'
import Context from '../Context/context'
import { useContext } from 'react'
import DropDownLoginPartial from './dropDownLoginPartial'

export default function CustomDropDownButton(){
    const {SelectedCategory} = useContext(Context)
    const [selectedCategory, setSelectedCategory] = SelectedCategory
    const refreshSelectedCategory = () => {
        setSelectedCategory('')
    }
    const navigate = useNavigate()
    return(

        <DropdownButton menuVariant='dark' className={'navbar-toggler'} variant='dark' title={<span className={"navbar-toggler-icon"}></span>}>
            <Dropdown.Item href="" onClick={() => {
                refreshSelectedCategory()
                navigate('/')
                }}>Home</Dropdown.Item>
            <Dropdown.Divider></Dropdown.Divider>
            <DropDownLoginPartial/>
        </DropdownButton>
    )
}