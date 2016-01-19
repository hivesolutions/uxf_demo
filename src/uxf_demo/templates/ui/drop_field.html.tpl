<section id="drop-field">
    <h1  class="line">Drop Field</h1>
    <div class="section-contents">
        <p>This element may be used for relation where one element should use autocomplete. It supports all text field data attributes.</p>

        <div class="box box-white">
            <div class="drop-field" data-display_attribute="teste">
                <ul class="data-source" data-type="countries"></ul>
            </div>
        </div>

<pre class="code language-markup">
&lt;div class=&quot;drop-field&quot;&gt;
    &lt;ul class=&quot;data-source&quot; data-type=&quot;countries&quot;&gt;&lt;/ul&gt;
&lt;/div&gt;
</pre>

        <table class="table-data">
            <tr>
                <td><span class="highlight">data-submit</span></td>
                <td><span class="highlight">boolean</span></td>
                <td>If the parent form of the drop field should be submitted uppon action.</td>
            </tr>
            <tr>
                <td><span class="highlight">data-duration</span></td>
                <td><span class="highlight">integer</span></td>
                <td>The duration for the scrolling effect in milliseconds. If set the link value in the item must be internal.</td>
            </tr>
            <tr>
                <td><span class="highlight">data-offset</span></td>
                <td><span class="highlight">integer</span></td>
                <td>The offset to the target element in pixels, the value may be positive or negative.</td>
            </tr>
            <tr>
                <td><span class="highlight">data-number_options</span></td>
                <td><span class="highlight">integer</span></td>
                <td>If set overrides the default number of options to be present per each load (set to minus one for infinite).</td>
            </tr>
        </table>

        <table class="table-data">
            <tr>
                <td><span class="highlight">value_select( value, logic, item )</span></td>
                <td class="description">Raised when a value is selected in the drop field.</td>
            </tr>
            <tr>
                <td><span class="highlight">value_unselect( )</span></td>
                <td class="description">Raised when a value is unselected from the drop field.</td>
            </tr>
        </table>
    </div>
</section>
