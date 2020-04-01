import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "../../../services/history";

import api from "../../../services/api";

function* deliverymanRegister({ payload }) {
    var deliveryman = {};

    try {
        const { avatar_id, name, email } = payload;

        deliveryman = yield call(api.post, "deliveryman", {
            avatar_id,
            name,
            email,
        });

        toast.success("Salvo com sucesso");

        history.push("/deliverymans");
    } catch (err) {
        if (err.response.data.error) {
            toast.error(err.response.data.error);
        } else {
            console.warn(err);
        }
    }
}

function* deliverymanUpdate({ payload }) {
    const { avatar_id, name, email, id } = payload;

    try {
        yield call(api.put, `deliveryman/${id}`, {
            avatar_id,
            name,
            email,
        });

        toast.success("Atualizado com sucesso", {});

        history.push("/deliverymans");
    } catch (err) {
        if (err.response.data.error) {
            toast.error(err.response.data.error);
        } else {
            console.warn(err);
        }
    }
}

function* deliverymanDelete({ payload }) {
    const { id, callback } = payload;

    try {
        yield call(api.delete, `deliveryman/${id}`);

        toast.success("Excluído com sucesso", {});
    } catch (err) {
        if (err.response.data.error) {
            toast.error(err.response.data.error);
        } else {
            console.warn(err);
        }
    } finally {
        callback();
    }
}

export default all([
    takeLatest("@deliveryman/REGISTER_REQUEST", deliverymanRegister),
    takeLatest("@deliveryman/UPDATE_REQUEST", deliverymanUpdate),
    takeLatest("@deliveryman/DELETE_REQUEST", deliverymanDelete),
]);
