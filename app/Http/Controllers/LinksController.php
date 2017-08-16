<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateLink;
use App\Link;

class LinksController extends Controller
{
    /**
     * Creats a new link.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @param  CreateLink $request
     *
     * @return array|json
     */
    public function create(CreateLink $request)
    {
        return [
            'status' => 'success',
            'data' => auth()->user()->links()->create([
                'original' => $request->url,
                'slug' => str_random(10)
            ]),
        ];
    }

    /**
     * Return the user links.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @return array|json
     */
    public function links()
    {
        return auth()->user()->links()->orderBy('id', 'desc')->get()->map(function ($link) {
            $link['url'] = $link->url();
            $link['views'] = $link->views()->get()->count();
            return $link;
        });
    }

    /**
     * Return the link information if the user owns it.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @param  int $id
     *
     * @return array|json
     */
    public function link($id)
    {
        $links = $this->links()->where('id', $id);

        if ($links->isEmpty()) {
            return ['error' => "Invalid ID"];
        }

        $link = $links->first();

        $link['views'] = $link->views()->get();

        return $link;
    }

    /**
     * Returns the total ammount of views a user have.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @return array|json
     */
    public function totalViews()
    {
        return ['views' => $this->links()->sum(function ($link) {
            return $link->views()->get()->count();
        })];
    }

    /**
     * Redirects to the link's original URL.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @return Response
     */
    public function redirect($slug)
    {
        $link = Link::where('slug', $slug)->firstOrFail();

        $link->addView();

        return redirect($link->original);
    }
}
