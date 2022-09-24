import { Trash } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { InputMask } from 'react-masked';
import Cart from '../../assets/cart.svg';
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { useCart } from "../../Hooks/useCart";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Modal } from "../Components/Modal";
import { useState } from "react";

type FormInputs = {
  fullName: string
  cpf: string
  phone: string
  email: string
  zipcode: string
  address: string
  city: string
  uf: string
}

export function Checkout() {
  const [isOpen, setIsOpen] = useState(false)
  const { getCartMovies, deleteMovie, getCartCount, getSubtotal } = useCart()
  const movies = getCartMovies()

  const toggle = () => setIsOpen(p => !p)

  const defaultValues = {
    city: '',
    cpf: '',
    email: '',
    fullName: '',
    phone: '',
    zipcode: '',
    address: '',
    uf: ''
  }

  const validationScheme = Yup.object().shape({
    city: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório").matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF inválido"),
    email: Yup.string().required("Campo obrigatório").email("E-mail inválido"),
    fullName: Yup.string().required("Campo obrigatório").matches(/\w+\s+\w/, "Nome completo inválido"),
    phone: Yup.string().required("Campo obrigatório").matches(/^\(\d{2}\) \d\ \d{4}-\d{4}$/gi, "Telefone inválido"),
    zipcode: Yup.string().required("Campo obrigatório").matches(/^\d{3}\.\d{2}\-\d{3}$/gi, "CEP inválido"),
    address: Yup.string().required("Campo obrigatório").matches(/\w+\s+\w/, "Endereço inválido"),
    uf: Yup.string().required("Campo obrigatório").matches(/^[a-z]{2}/, "Estado inválido"),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues,
    resolver: yupResolver(validationScheme)
  })

  function onSubmit(data: FormInputs) {
    toggle()
  }

  console.log(errors)

  return (
    <div className="flex justify-center relative">
      <Modal
        toggle={toggle}
        title="Obrigado Naruto Uzumaki"
        isOpen={isOpen}
        body={
          <div className="text-center">
            <p>Sua compra foi finalizada com sucesso!</p>
            <p>É tô certo xD</p>
          </div>
        }
      />
      <div className="w-full lg:w-[1200px] grid grid-cols-1 lg:grid-cols-2 mx-10 lg:mx-20 gap-5 py-5">
        <div>
          <div className="grid grid-cols-4 gap-3">
            <p className="col-span-4 cols text-2xl font-bold">Finalizar Compra</p>

            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange } }) => {
                return (
                  <div className="col-span-4">
                    <Input
                      placeholder="Nome completo"
                      onChange={onChange}
                    />
                    {!!errors.fullName && (
                      <small className="text-red-600">{errors.fullName?.message}</small>
                    )}
                  </div>
                )
              }}
            />

            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange } }) => {
                return (
                  <div className="col-span-4 lg:col-span-2">
                    <InputMask
                      mask="999.999.999-99"
                      placeholder="CPF"
                      className="p-2 h-10 rounded-md outline-none border w-full"

                      onChange={onChange}
                    />
                    {!!errors.cpf && (
                      <small className="text-red-600">{errors.cpf?.message}</small>
                    )}
                  </div>
                )
              }}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange } }) => {
                return (
                  <div className="col-span-4 lg:col-span-2">
                    <InputMask
                      mask="(99) 9 9999-9999"
                      placeholder="Celular"
                      className="p-2  h-10 rounded-md outline-none border w-full"
                      onChange={onChange}
                    />
                    {!!errors.phone && (
                      <small className="text-red-600">{errors.phone?.message}</small>
                    )}
                  </div>
                )
              }}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange } }) => {
                return (
                  <div className="col-span-4">
                    <Input placeholder="E-mail" onChange={onChange} />
                    {!!errors.email && (
                      <small className="text-red-600">{errors.email?.message}</small>
                    )}
                  </div>
                )
              }}
            />

            <Controller
              control={control}
              name="zipcode"
              render={({ field: { onChange } }) => {
                return (
                  <div className="col-span-4 lg:col-span-1">
                    <InputMask
                      mask="999.99-999"
                      placeholder="CEP"
                      className="p-2 h-10 rounded-md outline-none border w-full"

                      onChange={onChange}
                    />
                    {!!errors.zipcode && (
                      <small className="text-red-600">{errors.zipcode?.message}</small>
                    )}
                  </div>
                )
              }}
            />

            <Controller
              control={control}
              name="address"
              render={({ field: { onChange } }) => {
                return (
                  <div className="col-span-4 lg:col-span-3">
                    <Input placeholder="Endereço" onChange={onChange} />
                    {!!errors.address && (
                      <small className="text-red-600">{errors.address?.message}</small>
                    )}
                  </div>
                )
              }}
            />

            <Controller
              control={control}
              name="city"
              render={({ field: { onChange } }) => {
                return (
                  <div className="col-span-4 lg:col-span-2">
                    <Input placeholder="Cidade" onChange={onChange} />
                    {!!errors.city && (
                      <small className="text-red-600">{errors.city?.message}</small>
                    )}
                  </div>
                )
              }}
            />

            <Controller
              control={control}
              name="uf"
              render={({ field: { onChange } }) => {
                return (
                  <div className="col-span-4 lg:col-span-2">
                    <InputMask
                      mask="aa"
                      placeholder="Estado (UF)"
                      className="p-2 h-10 rounded-md outline-none border w-full"

                      onChange={onChange}
                    />
                    {!!errors.uf && (
                      <small className="text-red-600">{errors.uf?.message}</small>
                    )}
                  </div>
                )
              }}
            />
          </div>
        </div>
        <div className="min-h-[300px] flex flex-col justify-between">
          <table>
            <thead>
              <tr>
                <th className="text-left">Imagem</th>
                <th className="text-left">Nome</th>
                <th className="text-left">Qtd</th>
                <th className="text-left">Preço</th>
              </tr>
            </thead>
            <tbody>
              {
                movies && movies.map((movie) => {
                  return (
                    <tr className="border-b" key={movie.id}>
                      <td>
                        <img
                          className="h-20"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={`Capa do filme ${movie.title}`}
                        />
                      </td>
                      <td>{movie.title}</td>
                      <td>1</td>
                      <td>{currencyFormatter(movie.vote_average ?? 0)}</td>
                      <td>
                        <Trash
                          size={20}
                          onClick={() => deleteMovie(movie)}
                          className='hover:cursor-pointer hover:scale-[1.2] transition-all ease-in-out duration-300 mr-2'
                        />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          {
            movies && movies.length === 0 && (
              <div className="flex flex-col justify-center">
                <img
                  src={Cart}
                  alt="Homem segurando papel ao lado de um carrinho de compras vazio"
                  className="h-[200px]"
                />
                <div className="my-5">
                  <p className="text-center">Voce não possui nenhum filme em seu carrinho.</p>
                  <p className="text-center">Adicione filmes ao seu carrinho e volte novamente para finalizar a compra</p>
                </div>
              </div>
            )
          }
          <div className="flex justify-between my-10">
            <p className="text-xl">Total:</p>
            <p className="text-2xl font-bold">{currencyFormatter(getSubtotal())}</p>
          </div>
          <div className="w-full">
            <Button
              disabled={getCartCount() === 0}
              onClick={handleSubmit(onSubmit)}
            >
              Finalizar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}