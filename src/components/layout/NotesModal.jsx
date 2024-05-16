import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import {useQuery, useMutation} from "@tanstack/react-query";
import {Textarea} from "@nextui-org/react";
import axios from "../../api/axios";
import { useState } from "react";

function NotesModal({appointmentID, isOpen, onOpenChange, onClose})
{
    const [notesFetched, setNotesFetched] = useState(false);
    const [writtenNotes, setWritenNotes] = useState("");

    const {data:notes} = useQuery({

        queryKey: ["medicNotes", appointmentID],
        queryFn: async () => {
          setNotesFetched(false);
          const res = await axios.get(`/medic/appointments/${appointmentID}/notes`, {
            headers: {
              Authorization: localStorage.getItem("token")
                ? `Bearer ${localStorage.getItem("token")}`
                : undefined,
            },
          });
            setNotesFetched(true);
          return res.data.notes;
        },
        enabled: isOpen,
      });

     const addNotes = useMutation({
        mutationKey: "addNotes",
        mutationFn: async (notes) => {
          const res = await axios.post(`/medic/appointments/${appointmentID}/notes`, notes, {
            headers: {
              Authorization: localStorage.getItem("token")
                ? `Bearer ${localStorage.getItem("token")}`
                : undefined,
            },
          });
          return res.data;
        },
        onSuccess: () => {
          onOpenChange(false);
        },
        });



    return(

    <Modal size="xs" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Appointment Notes</ModalHeader>
              <ModalBody>
            {notesFetched && notes && (
              <Textarea
                    label="Notes"
                    placeholder="Enter Notes"
                    className="max-w-xs"
                    
                    defaultValue={notes}
                    onChange={(e) => {
                        setWritenNotes(e.target.value);
                    }}
                    />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" 
                onPress={() => {
                    addNotes.mutate({
                        notes: writtenNotes,
                    });
                }
                }
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      ) 


}


export default NotesModal