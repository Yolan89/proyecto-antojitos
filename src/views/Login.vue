<template>
    <BasicLayout>
        <div class="login">
            <h2>Iniciar Sesión</h2>
            <form class="ui form" @submit.prevent="login">
                <div class="field">
                    <input type="text" placeholder="Nombre de usuario" v-model="formData.identifier"
                        :class="{ error: formError.identifier }" />
                </div>
                <div class="field">
                    <input type="password" placeholder="Contraseña" v-model="formData.password"
                        :class="{ error: formError.password }" />
                </div>
                <button type="submit" class="ui button fluid primary" :class="{ loading }">
                    Entrar
                </button>

                <div class="danger">
                    <p v-if="formError.general" class="error-login">{{ formError.general }}</p>
                </div>
            </form>
            <router-link to="/register">
                Crear una cuenta
            </router-link>
        </div>
    </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as Yup from "yup";
import BasicLayout from '../layouts/BasicLayout.vue';
import { loginApi } from "../api/user";
import { setTokenApi, getTokenApi } from "../api/token";


export default {
    name: "Login",
    components: {
        BasicLayout,
    },
    setup() {
        let formData = ref({});
        let formError = ref({});
        let loading = ref(false);
        const router = useRouter();
        const token = getTokenApi();

        onMounted(() => {
            if (token) return router.push("/");

        });


        const schemaForm = Yup.object().shape({
            identifier: Yup.string().required(true),
            password: Yup.string().required(true),
        });

        const login = async () => {
            formError.value = {};
            let errorMessage = ""; //variable para guardar el mensaje de error 

            try {
                await schemaForm.validate(formData.value, { abortEarly: false })
                try {
                    const response = await loginApi(formData.value);
                    if (!response?.jwt) throw "El usuario o contraseña no son válidos";
                    setTokenApi(response.jwt);
                    console.log(setTokenApi);


                    router.push("/");
                } catch (error) {
                    console.log(error);
                    errorMessage = "El usuario o contraseña no son válidos";

                }

            } catch (error) {
                error.inner.forEach((err) => {
                    formError.value[err.path] = err.message;
                });
            }

            //Asignamos el error
            if (errorMessage) {
                formError.value.general = errorMessage; //se guarda el mensaje de error 
            }

        };
        return {
            formData,
            formError,
            loading,
            login,
        }

    },
};
</script>

<style lang="scss" scoped>
.login {
    text-align: center;

    >h2 {
        margin: 50px 0 30px 0;
    }

    .ui.form {
        max-width: 300px;
        margin: 0 auto;
        margin-bottom: 10px;


        input.error {
            border-color: #faa;
            background: #ffeded;
        }

        .error-login {
            font-size: 15px;
            color: #faa;
            margin-top: 10px;
        }
    }
}
</style>