import React from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader } from 'reactstrap'

const ModalTransaksi = (props) => {

    return (
        <Modal isOpen={props.openModal}
            toggle={props.toggleModal} size="lg">
            <ModalHeader className="d-block shadow-sm">
                <span className="material-icons" style={{ float: "right" }}>
                    close
                </span>
                <div style={{ textAlign: "center" }}>
                    <h4 style={{ fontWeight: "700" }}>Detail Transaksi</h4>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-md-8 px-0" style={{ backgroundColor: "#F3F4F5" }}>
                        <Card className="px-4 rounded" style={{ border: "none" }}>
                            <p style={{ fontWeight: "bold" }}>{props.dataTransaksi.status}</p>
                            <span className="d-flex justify-content-between">
                                <p>No. Invoice</p>
                                <p style={{ fontWeight: "bold", color: "#3498db" }}>{props.dataTransaksi.invoice}</p>
                            </span>
                            <span className="d-flex justify-content-between">
                                <p>Tanggal Pembelian</p>
                                <p>{props.dataTransaksi.date}</p>
                            </span>
                        </Card>
                        <Card className="px-4 py-3 mt-2 rounded" style={{ border: "none" }}>
                            <p style={{ fontWeight: "bold" }}>Detail Produk</p>
                            <Card>
                                <div className="row">
                                    <div className="col-md-1">
                                        {/* image */}
                                    </div>
                                    <div className="col-md-7">
                                        {/* nama, qty dan harga per pcs */}
                                    </div>
                                    <div className="col-md-4">
                                        <p>Total Harga</p>
                                        {/* Total harga */}
                                    </div>
                                </div>
                            </Card>
                        </Card>
                        <Card className="px-4 py-3 mt-2 rounded" style={{ border: "none" }}>
                            <p style={{ fontWeight: "bold" }}>Rincian Pembayaran</p>
                            <span className="d-flex justify-content-between">
                                <p>Total Harga (xx barang)</p>
                                <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp. xx.xxx.xxx</p>
                            </span>
                            <span className="d-flex justify-content-between">
                                <p>Total Ongkos Kirim</p>
                                <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp. xx.xxx.xxx</p>
                            </span>
                            <span className="d-flex justify-content-between">
                                <p>Total Bayar</p>
                                <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp. xx.xxx.xxx</p>
                            </span>
                        </Card>
                    </div>
                    <div className="col-md-4 p-3">
                        <Button
                            outline
                            size="lg"
                            className="my-2"
                            style={{ width: "100%" }}>
                            Chat Penjual
                        </Button>
                        <Button outline size="lg" style={{ width: "100%" }}>Bantuan</Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
};

export default ModalTransaksi;