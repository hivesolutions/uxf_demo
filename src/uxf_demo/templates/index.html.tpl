{% extends "partials/layout.html.tpl" %}
{% block content %}
    {% include "parts/bar.html.tpl" %}
    {% include "parts/search.html.tpl" %}
    {% include "parts/side_panel.html.tpl" %}
    {% include "parts/window.html.tpl" %}

    <div class="container container-960 shortcuts">
        {% include "ui/overview.html.tpl" %}
        {% include "ui/base.html.tpl" %}
        {% include "ui/mobile.html.tpl" %}
        {% include "ui/style.html.tpl" %}
        {% include "ui/drop_field.html.tpl" %}
        {% include "ui/drop_down.html.tpl" %}
        {% include "ui/drop_tag.html.tpl" %}
        {% include "ui/drop_list.html.tpl" %}
        {% include "ui/tag_field.html.tpl" %}
        {% include "ui/select_field.html.tpl" %}
        {% include "ui/filter.html.tpl" %}
        {% include "ui/select_list.html.tpl" %}
        {% include "ui/source_list.html.tpl" %}
        {% include "ui/cross_list.html.tpl" %}
        {% include "ui/data_source.html.tpl" %}
        {% include "ui/buttons.html.tpl" %}
        {% include "ui/button_group.html.tpl" %}
        {% include "ui/form.html.tpl" %}
        {% include "ui/form_elements.html.tpl" %}
        {% include "ui/name_change.html.tpl" %}
        {% include "ui/toogle_field.html.tpl" %}
        {% include "ui/progress_bar.html.tpl" %}
        {% include "ui/eval.html.tpl" %}
        {% include "ui/datetime.html.tpl" %}
        {% include "ui/calendar.html.tpl" %}
        {% include "ui/calendar_range.html.tpl" %}
        {% include "ui/table.html.tpl" %}
        {% include "ui/notification.html.tpl" %}
        {% include "ui/replacer.html.tpl" %}
        {% include "ui/changer.html.tpl" %}
        {% include "ui/link.html.tpl" %}
        {% include "ui/link_confirm.html.tpl" %}
        {% include "ui/windows.html.tpl" %}
        {% include "ui/key.html.tpl" %}
        {% include "ui/data_width.html.tpl" %}
        {% include "ui/transform_flip.html.tpl" %}
        {% include "ui/timestamp.html.tpl" %}
        {% include "ui/enumerations.html.tpl" %}
        {% include "ui/number_formatter.html.tpl" %}
        {% include "ui/password_meter.html.tpl" %}
        {% include "ui/rating.html.tpl" %}
        {% include "ui/tags.html.tpl" %}
        {% include "ui/chart.html.tpl" %}
        {% include "ui/highlight_box.html.tpl" %}
        {% include "ui/list.html.tpl" %}
        {% include "ui/scroll_list.html.tpl" %}
        {% include "ui/panel_more.html.tpl" %}
        {% include "ui/side_panel.html.tpl" %}
        {% include "ui/tabs.html.tpl" %}
        {% include "ui/menu.html.tpl" %}
        {% include "ui/wizard.html.tpl" %}
        {% include "ui/overlay.html.tpl" %}
        {% include "ui/image.html.tpl" %}
        {% include "ui/slideshow.html.tpl" %}
        {% include "ui/animation.html.tpl" %}
        {% include "ui/video.html.tpl" %}
    </div>
{% endblock %}
