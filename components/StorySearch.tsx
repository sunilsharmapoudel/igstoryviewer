"use client";

import { useActionState } from "react";
import { getStories } from "@/lib/actions";
import { initialStoriesLookupState } from "@/types/instagram";
import ResultsPanel from "@/components/ResultsPanel";
import { ArrowRightIcon } from "@/components/icons";

export default function StorySearch() {
  const [state, formAction, isPending] = useActionState(
    getStories,
    initialStoriesLookupState
  );

  return (
    <div>
      <form
        action={formAction}
        className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row lg:mx-0"
      >
        <div className="relative flex-1">
          <span className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-muted-foreground">
            @
          </span>
          <input
            type="text"
            name="username"
            placeholder="Enter Instagram username"
            required
            aria-label="Instagram username"
            className="w-full rounded-full border border-border bg-white py-3.5 pr-5 pl-9 text-base text-title shadow-soft outline-none transition-shadow focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-soft transition-all hover:bg-primary-hover hover:shadow-lifted disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Searching...
            </>
          ) : (
            <>
              View Stories
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      {state.status === "error" && state.errormessage && (
        <div
          role="alert"
          className="mx-auto mt-5 max-w-lg rounded-2xl border border-error/20 bg-error-bg px-5 py-4 text-sm font-medium text-error lg:mx-0"
        >
          {state.errormessage}
        </div>
      )}

      {state.status === "success" && <ResultsPanel state={state} />}
    </div>
  );
}
