export default function Alerta({ tipo, mensagem }) {
    if (!mensagem) return null;

    const classe = tipo === 'erro' ? 'alert alert-danger' : 'alert alert-success';

    return <div className={classe}>{mensagem}</div>;
}