'use client'

import {MdAdd} from "react-icons/md";
import {useState} from "react";
import ModalAnimator from "@/components/molecules/ModalAnimator";
import AddTransactionModal from "@/components/modals/AddTransactionModal";

export default function AddTransactionButton() {
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-5 right-5 bg-background p-2 rounded-lg shadow-xl z-overlay hover:scale-110 transition-transform"
        onClick={() => setShowAddTransactionModal(true)}
      >
        <MdAdd size={24}/>
      </button>
      <ModalAnimator showModal={showAddTransactionModal} onClose={() => setShowAddTransactionModal(false)}>
        <AddTransactionModal/>
      </ModalAnimator>
    </>
  )
}
