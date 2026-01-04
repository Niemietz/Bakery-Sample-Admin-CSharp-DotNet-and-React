import axios from 'axios'
import Swal from 'sweetalert2'

const api = axios.create({
    baseURL: import.meta.env.MODE === 'development'
        ? '/api'                  // o Vite proxy faz o resto
        : '/api',                  // em produção o Spring já está na mesma origem
    timeout: 10000
})

// INTERCEPTOR DE RESPOSTA – aqui tu trata TODOS os erros de uma vez só
api.interceptors.response.use(
    (response) => response,     // tudo certo → passa adiante

    (error) => {
        // Qualquer status fora de 2xx cai aqui
        if (error.response) {
            // Servidor respondeu com erro (404, 401, 403, 500…)
            const status = error.response.status

            if (status === 404) {
                /*Swal.fire({
                    title: 'Ops!',
                    text: 'Recurso não encontrado',
                    icon: 'error',
                })*/
                console.error("Recurso não encontrado")
            } else if (status === 401) {
                // Swal.fire('Atenção','Sessão expirada', 'warning')
                // navigateTo('/login')   // opcional: redireciona
                console.error('Sessão expirada')
            } else if (status === 403) {
                // Swal.fire('Ops!','Acesso negado', 'error')
                console.error('Acesso negado')
            } else if (status === 500) {
                // Swal.fire('Ops!','Erro interno do servidor', 'error')
                console.error('Erro interno do servidor')
            } else {
                // Swal.fire('Ops!',error.response.data.message || 'Erro na requisição', 'error')
                console.error(error.response.data.message || 'Erro na requisição')
            }
        } else if (error.request) {
            // Requisição foi feita mas não teve resposta (servidor desligado, CORS, etc.)
            // Swal.fire('Ops!','Não foi possível conectar ao servidor', 'error')
            console.error('Não foi possível conectar ao servidor')
        } else {
            // Swal.fire('Ops!','Erro inesperado', 'error')
            console.error('Erro inesperado')
        }

        // Importante: rejeita a promise para que o .catch do componente ainda funcione se quiser
        return Promise.reject(error)
    }
)

export default api