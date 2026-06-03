import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetCartAsync, selectItems } from '../features/cart/cartSlice';
import { updateCartAsync, deleteItemFromCartAsync } from '../features/cart/cartSlice';
import { useForm, SubmitHandler } from "react-hook-form"
import { selectUserInfo, updateUserAsync } from '../features/user/userSlice';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { discountedPrice } from '../app/constants';
import PopUp from '../features/popUp/PopUp';

export default function Example() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)

    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()

    const dispatch = useDispatch()
    const user = useSelector(selectUserInfo)
    const currentOrder = useSelector(selectCurrentOrder)

    // const items = useSelector(selectItems)
    // const totalAmount = Math.round(items.reduce((amount, item) => discountedPrice(item.product) * item.quantity + amount, 0))
    // const totalItems = items.reduce((total, item) => item.quantity + total, 0)

    const items = useSelector(selectItems) || []

const totalAmount = Math.round(
  items.reduce(
    (amount, item) =>
      discountedPrice(item.product) * item.quantity + amount,
    0
  )
)

const totalItems = items.reduce(
  (total, item) => item.quantity + total,
  0
)

    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState('cash')

    const [show, setShow] = useState(0);    //This is for PopUp module
    const [message, setMessage] = useState("msg");

    
    const handleQuantity = (e, item) => {
        // + to convert the string to int
        dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }))
    }
    
    const handleRemove = (e, id) => {
        dispatch(deleteItemFromCartAsync(id))
    }

    const handleAddress = (e) => {
        setSelectedAddress(user.addresses[e.target.value])
    }

    const handlePayment = (e) => {
        setPaymentMethod(e.target.value)
    }
    
    const handleOrder = (e) => {
        if (paymentMethod && selectedAddress) {
            const order = {
                items,
                totalAmount,
                totalItems,
                user: user.id,
                paymentMethod,
                selectedAddress,
                status: 'pending'   //it can be 'delivered'
            }
            console.log("Order in CheckOut: ", order.selectedAddress)
            dispatch(createOrderAsync(order))
            dispatch(resetCartAsync(user.id))
            setShow(true)
            setMessage("Order Successfully Placed")
            func()
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
        else {
            setShow(true);
            let msg = "Please, Enter your ";
            if(!selectedAddress) msg = msg + "Address";
            if(!paymentMethod) msg = msg + ", Payment Method";
            msg += ' !';
            setMessage(msg);
            func();
        }
    }
    
    const func = () => {
        setTimeout(() => {
            setShow(false)
        }, 1200)
    }

    return (
        <>
            {
                show &&
                <PopUp className="z-20" title={message}></PopUp>
            }

            {items && items.length == 0 && <Navigate to='/'></Navigate>}

            {/* {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`}></Navigate>} */}

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className='py-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
                    <div className='lg:col-span-3'>
                        <form noValidate onSubmit={handleSubmit((data) => {
                            dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }))
                            reset()
                            console.log(data);
                        })}>
                            <div className="space-y-12 my-10 bg-white p-4 md:p-10 rounded-xl shadow-xl">

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('name', { required: ("name is required") })}
                                                    id="name"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register('email', { required: ("email is required") })}
                                                    type="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phone"
                                                    {...register('phone', { required: ("phone is required") })}
                                                    type="tel"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="street"
                                                    {...register('street', { required: "street is required" })}
                                                    type="text"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('city', { required: ("city is required") })}
                                                    id="city"
                                                    autoComplete="address-level2"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('state', { required: ("state is required") })}
                                                    id="state"
                                                    autoComplete="address-level1"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('pinCode', { required: ("pin code is required") })}
                                                    id="pinCode"
                                                    autoComplete="pinCode"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex items-center justify-center gap-x-6">
                                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choose from existing address
                                    </p>
                                    <ul role="list" className="divide-y divide-gray-100">
                                        {user?.addresses?.map((person, index) => (
                                            <li key={index} className="flex justify-between gap-x-6 py-5">
                                                <div className="flex min-w-0 gap-x-4">
                                                    <input
                                                        onChange={handleAddress}
                                                        id="address"
                                                        name="address"
                                                        value={index}
                                                        required={true}
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Phone : {person.phone}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">{person.street}</p>
                                                    <p className="text-sm leading-6 text-gray-900">{person.city} - {person.pinCode}</p>
                                                    <p className="text-sm leading-6 text-gray-900">{person.state}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Method</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Choose one.</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        onChange={handlePayment}
                                                        id="cash"
                                                        name="payment"
                                                        value="cash"
                                                        checked={paymentMethod === "cash"}
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash on delivery
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        onChange={handlePayment}
                                                        id="upi"
                                                        name="payment"
                                                        value="upi"
                                                        checked={paymentMethod === "upi"}
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="upi" className="block text-sm font-medium leading-6 text-gray-900">
                                                        UPI
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        onChange={handlePayment}
                                                        id="card"
                                                        name="payment"
                                                        value="card"
                                                        checked={paymentMethod === "card"}
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Card
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* order summary*/}
                    <div className='lg:col-span-2'>

                        <div className="bg-white mt-10 mx-auto max-w-5xl px-2 sm:px-4 md:px-6 pb-5 rounded-xl shadow-xl">
                            <h2 className="font-bold text-3xl my-4 pt-4 px-2">Order summary</h2>

                            <div className="border-t border-gray-200 py-4 px-2">

                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {items.map((item) => (
                                            <li key={item.id} className="flex py-6">
                                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={item.product.thumbnail}
                                                        alt={item.product.title}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={item.product.href}>{item.product.title}</a>
                                                            </h3>
                                                            <p className="ml-4">${discountedPrice(item.product)}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{item.product.color}</p>
                                                    </div>
                                                    <div className="flex items-end justify-between text-sm">
                                                        <p className="text-gray-500 flex items-center justify-center gap-4 h-2 my-4">
                                                            Qty
                                                            <div>
                                                                <select onChange={(e) => handleQuantity(e, item)} value={item.quantity} className='rounded-xl my-2'>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                    <option value="5">5</option>
                                                                </select>
                                                            </div>
                                                        </p>

                                                        <div className="flex">
                                                            <button
                                                                onClick={e => handleRemove(e, item.id)}
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                {<TrashIcon className='h-7 w-7 hover:scale-125  transition-transform duration-300'></TrashIcon>}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-4">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${totalAmount}</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total items</p>
                                    <p>{totalItems} items</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <div
                                        onClick={handleOrder}
                                        className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Order Now
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{' '}
                                        <Link to="/">
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                onClick={() => setOpen(false)}
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}