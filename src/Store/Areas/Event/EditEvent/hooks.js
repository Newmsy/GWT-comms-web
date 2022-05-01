import React from "react";
import { HookApiClient } from "../../../apiClient";

export const useEditEvent = () => {
    const onSubmitEdit = React.useCallback(async ({...event})=>{
        const apiClient = new HookApiClient()
        console.log(event)

        await apiClient.put("api/event",{...event})
        return true
    },[])

    const onSubmitDelete = React.useCallback(async ({...event})=>{
        const apiClient = new HookApiClient()

        await apiClient.delete("api/event",{...event})
        return true
    },[])

  return {
    onSubmitEdit,
    onSubmitDelete
  };
};
