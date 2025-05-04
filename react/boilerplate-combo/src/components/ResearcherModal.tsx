import React, {useState} from "react";
import {Researcher} from "../types/researcher";
import './ResearcherModal.css';

interface ModalProps {
    onClose: () => void;
    onSave: (data: Partial<Researcher>) => void;
    researcher: Researcher | null;
}

export default function ResearcherModal(props: ModalProps) {
    const [name, setName] = useState<string>(props.researcher ? props.researcher.name : '');
    const [step, setStep] = useState(1);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.onSave({ name });
    }

    if (props.researcher) {
        return (
            <div className="modal">
                <h3>Edit Researcher</h3>

                {step === 1 && (
                    <>
                        <h4>Step 1: Basic Info</h4>
                        <input placeholder="Name" />
                        <div>
                            <button onClick={props.onClose}>Cancel</button>
                            <button onClick={() => setStep(2)}>Next</button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h4>Step 2: Contact Info</h4>
                        <input placeholder="Email" />
                        <div>
                            <button onClick={() => setStep(1)}>Previous</button>
                            <button onClick={() => setStep(3)}>Next</button>
                            <button onClick={props.onClose}>Cancel</button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h4>Step 3: Review & Submit</h4>
                        <div>
                            <button onClick={() => setStep(2)}>Previous</button>
                            <button onClick={() => props.onSave}>Save</button>
                            <button onClick={props.onClose}>Cancel</button>
                        </div>
                    </>
                )}
            </div>);
    }
    else {
        return (
            <div className="modal">
                <h3>Add Researcher</h3>

                {step === 1 && (
                    <>
                        <h4>Step 1: Basic Info</h4>
                        <input placeholder="Name" />
                        <div>
                            <button onClick={props.onClose}>Cancel</button>
                            <button onClick={() => setStep(2)}>Next</button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h4>Step 2: Contact Info</h4>
                        <input placeholder="Email" />
                        <div>
                            <button onClick={() => setStep(1)}>Previous</button>
                            <button onClick={() => setStep(3)}>Next</button>
                            <button onClick={props.onClose}>Cancel</button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h4>Step 3: Review & Submit</h4>
                        <div>
                            <button onClick={() => setStep(2)}>Previous</button>
                            <button onClick={() => props.onSave}>Save</button>
                            <button onClick={props.onClose}>Cancel</button>
                        </div>
                    </>
                )}
            </div>);
    }
}

function Modal({ onClose, onSave, researcher }: ModalProps) {
    const [name, setName] = useState<string>(researcher ? researcher.name : '');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSave({ name });
    }

    return (
        <div className="modal">
            <h3>{researcher ? 'Edit Researcher' : 'Add Researcher'}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <button type="submit">Save</button>
                <button onClick={onClose} type="button">Cancel</button>
            </form>
        </div>
    );
}