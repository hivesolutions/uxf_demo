{% include "partials/doctype.html.tpl" %}
<head>
    {% block head %}
        {% include "partials/content_type.html.tpl" %}
        {% include "partials/includes.html.tpl" %}
        <title>uxFramework</title>
    {% endblock %}
</head>
<body class="ux wait-load">
    {% include "partials/side_menu.html.tpl" %}
    {% block content %}{% endblock %}
    {% include "partials/footer.html.tpl" %}
</body>
{% include "partials/end_doctype.html.tpl" %}
